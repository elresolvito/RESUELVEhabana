import { createPool } from '@vercel/postgres';

// Crear conexión a la base de datos
const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

// Función para inicializar la tabla si no existe
async function initTable() {
  const client = await pool.connect();
  try {
    await client.sql`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        price VARCHAR(50) NOT NULL,
        category VARCHAR(30) NOT NULL,
        contact VARCHAR(50) NOT NULL,
        image TEXT NOT NULL,
        last_updated BIGINT NOT NULL,
        views INTEGER DEFAULT 0
      )
    `;
    
    // Crear índice para ordenar más rápido
    await client.sql`
      CREATE INDEX IF NOT EXISTS idx_last_updated ON products(last_updated DESC)
    `;
  } finally {
    client.release();
  }
}

export default async function handler(req, res) {
  // Configurar CORS para que funcione desde cualquier lugar
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  await initTable();
  const client = await pool.connect();
  
  try {
    // GET: Obtener productos (con orden rotativo)
    if (req.method === 'GET') {
      const { category } = req.query;
      
      let query = 'SELECT * FROM products ORDER BY last_updated DESC';
      let params = [];
      
      if (category && category !== 'all') {
        query = 'SELECT * FROM products WHERE category = $1 ORDER BY last_updated DESC';
        params = [category];
      }
      
      const result = await client.sql.query(query, params);
      
      // Agregar posición rotativa (si misma fecha, orden aleatorio)
      let products = result.rows;
      const now = Date.now();
      
      // Los productos con misma última actualización se mezclan aleatoriamente
      const groupedByDate = {};
      products.forEach(p => {
        const dateKey = Math.floor(p.last_updated / 86400000); // agrupar por día
        if (!groupedByDate[dateKey]) groupedByDate[dateKey] = [];
        groupedByDate[dateKey].push(p);
      });
      
      // Mezclar los que tienen misma fecha
      let sortedProducts = [];
      Object.keys(groupedByDate).sort((a,b) => b - a).forEach(dateKey => {
        const group = groupedByDate[dateKey];
        // Mezclar aleatoriamente dentro del mismo día
        for (let i = group.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [group[i], group[j]] = [group[j], group[i]];
        }
        sortedProducts.push(...group);
      });
      
      return res.status(200).json(sortedProducts);
    }
    
    // POST: Agregar o renovar producto
    if (req.method === 'POST') {
      const { id, title, price, category, contact, image } = req.body;
      
      if (!title || !price || !contact || !image) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }
      
      const newId = id || 'p' + Date.now() + Math.random().toString(36).substr(2, 6);
      const now = Date.now();
      
      // Verificar si ya existe
      const exists = await client.sql.query('SELECT id FROM products WHERE id = $1', [newId]);
      
      if (exists.rows.length > 0) {
        // Actualizar (renovar)
        await client.sql.query(
          'UPDATE products SET last_updated = $1, title = $2, price = $3, category = $4, contact = $5, image = $6 WHERE id = $7',
          [now, title, price, category, contact, image, newId]
        );
        return res.status(200).json({ success: true, action: 'renewed', id: newId });
      } else {
        // Insertar nuevo
        await client.sql.query(
          'INSERT INTO products (id, title, price, category, contact, image, last_updated, views) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
          [newId, title, price, category, contact, image, now, 0]
        );
        return res.status(201).json({ success: true, action: 'created', id: newId });
      }
    }
    
    // DELETE: Eliminar productos viejos (más de 15 días)
    if (req.method === 'DELETE') {
      const fifteenDaysAgo = Date.now() - (15 * 86400000);
      const result = await client.sql.query(
        'DELETE FROM products WHERE last_updated < $1 RETURNING id',
        [fifteenDaysAgo]
      );
      return res.status(200).json({ deleted: result.rowCount });
    }
    
    return res.status(405).json({ error: 'Método no permitido' });
    
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    client.release();
  }
}
