CREATE DATABASE IF NOT EXISTS mi_futbol_league;
USE mi_futbol_league;

CREATE TABLE IF NOT EXISTS equipos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  ciudad VARCHAR(100) NOT NULL,
  entrenador VARCHAR(100),
  fundacion INT
);

CREATE TABLE IF NOT EXISTS jugadores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  posicion VARCHAR(50),
  edad INT,
  numero_camiseta INT,
  equipo_id INT,
  FOREIGN KEY (equipo_id) REFERENCES equipos(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS partidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  equipo_local_id INT,
  equipo_visitante_id INT,
  goles_local INT DEFAULT 0,
  goles_visitante INT DEFAULT 0,
  estado VARCHAR(20) DEFAULT 'programado', -- programado, en_juego, finalizado
  FOREIGN KEY (equipo_local_id) REFERENCES equipos(id) ON DELETE CASCADE,
  FOREIGN KEY (equipo_visitante_id) REFERENCES equipos(id) ON DELETE CASCADE
);
