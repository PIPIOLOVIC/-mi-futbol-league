const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: 'pipiolo1218',
  database: 'mi_futbol_league'
};

// Conexión a la base de datos
let connection;

async function connectDB() {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Conectado a la base de datos MySQL');
  } catch (error) {
    console.error('Error conectando a MySQL:', error.message);
  }
}

connectDB();

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: '¡Backend de Mi Futbol League funcionando!' });
});

// Obtener todos los equipos
app.get('/api/equipos', async (req, res) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM equipos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un equipo por ID
app.get('/api/equipos/:id', async (req, res) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM equipos WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Equipo no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los jugadores
app.get('/api/jugadores', async (req, res) => {
  try {
    const [rows] = await connection.execute(`
      SELECT j.*, e.nombre as equipo_nombre
      FROM jugadores j
      LEFT JOIN equipos e ON j.equipo_id = e.id
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un jugador por ID
app.get('/api/jugadores/:id', async (req, res) => {
  try {
    const [rows] = await connection.execute(`
      SELECT j.*, e.nombre as equipo_nombre
      FROM jugadores j
      LEFT JOIN equipos e ON j.equipo_id = e.id
      WHERE j.id = ?
    `, [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Jugador no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los partidos
app.get('/api/partidos', async (req, res) => {
  try {
    const [rows] = await connection.execute(`
      SELECT p.*,
             el.nombre as equipo_local_nombre,
             ev.nombre as equipo_visitante_nombre
      FROM partidos p
      LEFT JOIN equipos el ON p.equipo_local_id = el.id
      LEFT JOIN equipos ev ON p.equipo_visitante_id = ev.id
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un partido por ID
app.get('/api/partidos/:id', async (req, res) => {
  try {
    const [rows] = await connection.execute(`
      SELECT p.*,
             el.nombre as equipo_local_nombre,
             ev.nombre as equipo_visitante_nombre
      FROM partidos p
      LEFT JOIN equipos el ON p.equipo_local_id = el.id
      LEFT JOIN equipos ev ON p.equipo_visitante_id = ev.id
      WHERE p.id = ?
    `, [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Partido no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para agregar un nuevo equipo (POST)
app.post('/api/equipos', async (req, res) => {
  try {
    const { nombre, ciudad, entrenador, fundacion } = req.body;
    const [result] = await connection.execute(
      'INSERT INTO equipos (nombre, ciudad, entrenador, fundacion) VALUES (?, ?, ?, ?)',
      [nombre, ciudad, entrenador, fundacion]
    );
    res.json({ id: result.insertId, message: 'Equipo creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para agregar un nuevo jugador (POST)
app.post('/api/jugadores', async (req, res) => {
  try {
    const { nombre, apellido, posicion, edad, numero_camiseta, equipo_id } = req.body;
    const [result] = await connection.execute(
      'INSERT INTO jugadores (nombre, apellido, posicion, edad, numero_camiseta, equipo_id) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, apellido, posicion, edad, numero_camiseta, equipo_id]
    );
    res.json({ id: result.insertId, message: 'Jugador creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para agregar un nuevo partido (POST)
app.post('/api/partidos', async (req, res) => {
  try {
    const { fecha, hora, equipo_local_id, equipo_visitante_id, goles_local, goles_visitante, estado } = req.body;
    const [result] = await connection.execute(
      'INSERT INTO partidos (fecha, hora, equipo_local_id, equipo_visitante_id, goles_local, goles_visitante, estado) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [fecha, hora, equipo_local_id, equipo_visitante_id, goles_local, goles_visitante, estado]
    );
    res.json({ id: result.insertId, message: 'Partido creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(` Servidor corriendo en http://localhost:${port}`);
});
