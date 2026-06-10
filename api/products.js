import pg from 'pg';
import http from 'http';
const { Pool } = pg;

// Configurar conexión a PostgreSQL
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
});

// Función para inicializar la tabla
async function initTable() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        price VARCHAR(50) NOT NULL,
        category VARCHAR(30) NOT NULL,
        contact VARCHAR(50) NOT NULL,
        image TEXT NOT NULL,
        last_updated BIGINT NOT NULL,
        sold BOOLEAN DEFAULT FALSE
      )
    `);
    console.log('✅ Tabla products lista');
  } catch (err) {
    console.error('Error al crear tabla:', err);
  } finally {
    client.release();
  }
}

// Inicializar la tabla al arrancar
initTable();

// Servidor HTTP
const server = http.createServer(async (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // GET: Obtener productos
  if (req.method === 'GET') {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const category = url.searchParams.get('category');
    
    try {
      let query = 'SELECT * FROM products ORDER BY last_updated DESC';
      let params = [];
      
      if (category && category !== 'all') {
        query = 'SELECT * FROM products WHERE category = $1 ORDER BY last_updated DESC';
        params = [category];
      }
      
      const result = await pool.query(query, params);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result.rows));
    } catch (err) {
      console.error('Error GET:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Error al obtener productos' }));
    }
    return;
  }
  
  // POST: Crear o actualizar producto
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const { id, title, price, category, contact, image, sold } = JSON.parse(body);
        
        if (!title || !price || !contact || !image) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Faltan campos requeridos' }));
          return;
        }
        
        const now = Date.now();
        const newId = id || 'p' + now + Math.random().toString(36).substr(2, 6);
        
        // Verificar si existe
        const exists = await pool.query('SELECT id FROM products WHERE id = $1', [newId]);
        
        if (exists.rows.length > 0) {
          // Actualizar
          await pool.query(
            'UPDATE products SET title=$1, price=$2, category=$3, contact=$4, image=$5, last_updated=$6, sold=$7 WHERE id=$8',
            [title, price, category, contact, image, now, sold || false, newId]
          );
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, action: 'updated', id: newId }));
        } else {
          // Insertar nuevo
          await pool.query(
            'INSERT INTO products (id, title, price, category, contact, image, last_updated, sold) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [newId, title, price, category, contact, image, now, false]
          );
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, action: 'created', id: newId }));
        }
      } catch (err) {
        console.error('Error POST:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error al guardar producto' }));
      }
    });
    return;
  }
  
  res.writeHead(405);
  res.end();
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
