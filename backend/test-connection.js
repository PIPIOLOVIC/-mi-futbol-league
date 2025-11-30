const mysql = require('mysql2/promise');
const express = require('express');
const cors = require('cors');


const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: 'pipiolo1218',
  database: 'mi_futbol_league'
};

async function testConnection() {
  try {
    console.log('Probando conexión a MySQL...');
    const connection = await mysql.createConnection(dbConfig);
    console.log('Conexión exitosa a MySQL!');

    // Probar consulta de equipos
    const [equipos] = await connection.execute('SELECT * FROM equipos');
    console.log(` Equipos encontrados: ${equipos.length}`);

    // Probar consulta de jugadores
    const [jugadores] = await connection.execute('SELECT * FROM jugadores');
    console.log(` Jugadores encontrados: ${jugadores.length}`);

    // Probar consulta de partidos
    const [partidos] = await connection.execute('SELECT * FROM partidos');
    console.log(` Partidos encontrados: ${partidos.length}`);

    await connection.end();
    console.log(' ¡Todas las pruebas pasaron!');

  } catch (error) {
    console.error(' Error de conexión:', error.message);
  }
}

testConnection();
