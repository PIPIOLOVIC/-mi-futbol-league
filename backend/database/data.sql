USE mi_futbol_league;

INSERT INTO equipos (nombre, ciudad, entrenador, fundacion) VALUES
('Leones FC', 'Ciudad de México', 'Juan Pérez', 1990),
('Tigres del Norte', 'Monterrey', 'Ricardo Ferretti', 1960),
('Águilas Reales', 'Guadalajara', 'Miguel Herrera', 1916);

INSERT INTO jugadores (nombre, apellido, posicion, edad, numero_camiseta, equipo_id) VALUES
('Carlos', 'López', 'Delantero', 25, 9, 1),
('Pedro', 'Martínez', 'Portero', 28, 1, 1),
('Luis', 'García', 'Defensa', 22, 4, 2),
('Javier', 'Hernández', 'Delantero', 30, 14, 3);

INSERT INTO partidos (fecha, hora, equipo_local_id, equipo_visitante_id, goles_local, goles_visitante, estado) VALUES
('2023-11-01', '18:00:00', 1, 2, 2, 1, 'finalizado'),
('2023-11-05', '20:00:00', 2, 3, 0, 0, 'programado');
