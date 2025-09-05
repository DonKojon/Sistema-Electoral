const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Datos de prueba
const testData = {
  tribunal: { nombre: 'Tribunal Electoral Universitario' },
  elecciones: [
    {
      idTribunal: 1,
      inicio: '2024-01-01 08:00:00',
      cierre: '2024-12-31 18:00:00',
      estado: 'activa'
    },
    {
      idTribunal: 1,
      inicio: '2024-01-01 08:00:00',
      cierre: '2024-12-31 18:00:00',
      estado: 'activa'
    }
  ],
  candidatos: [
    // Elección de Decano (idEleccion: 1)
    { idEleccion: 1, nombre: 'FIORELLA MARCELA CANDIA', partido: 'ADN' },
    { idEleccion: 1, nombre: 'BISMAR ANDRES ESPINOZA', partido: 'DEMOCRATAS' },
    { idEleccion: 1, nombre: 'RAMIRO BRYAN MAMANI', partido: 'FRI' },
    { idEleccion: 1, nombre: 'MARIBEL ELENA LIMA', partido: 'MTS' },
    { idEleccion: 1, nombre: 'ERICK SANTIAGO QUISPE', partido: 'PAN-BOL' },
    // Elección de Director de Carrera (idEleccion: 2)
    { idEleccion: 2, nombre: 'ANTONIO GARCIA', partido: '1' },
    { idEleccion: 2, nombre: 'GABRIELA ALVAREZ', partido: '2' },
    { idEleccion: 2, nombre: 'FELIPE MARTINEZ', partido: '3' },
    { idEleccion: 2, nombre: 'JUAN PEREZ', partido: '4' }
  ]
};

async function insertTestData() {
  try {
    // Crear usuario demo
    console.log('👤 Creando usuario demo...');
    const bcrypt = require('bcryptjs');
    const defaultUser = {
      nombre: 'Usuario Demo',
      matricula: 'demo123',
      password: bcrypt.hashSync('demo123', 10),
      estado: 'activo'
    };

    await db.promise().query(
      'INSERT INTO Estudiante (nombre, matricula, password, estado) VALUES (?, ?, ?, ?)',
      [defaultUser.nombre, defaultUser.matricula, defaultUser.password, defaultUser.estado]
    );
    console.log('✅ Usuario demo creado (demo123/demo123)');

    // Insertar tribunal
    console.log('🏛️ Insertando tribunal...');
    await db.promise().query('INSERT INTO TribunalElectoral (nombre) VALUES (?)', [testData.tribunal.nombre]);
    
    // Insertar elecciones
    console.log('🗳️ Insertando elecciones...');
    for (const eleccion of testData.elecciones) {
      await db.promise().query(
        'INSERT INTO ActoElectoral (idTribunal, inicio, cierre, estado) VALUES (?, ?, ?, ?)',
        [eleccion.idTribunal, eleccion.inicio, eleccion.cierre, eleccion.estado]
      );
    }
    
    // Insertar candidatos
    console.log('👥 Insertando candidatos...');
    for (const candidato of testData.candidatos) {
      await db.promise().query(
        'INSERT INTO Candidato (idEleccion, nombre, partido) VALUES (?, ?, ?)',
        [candidato.idEleccion, candidato.nombre, candidato.partido]
      );
    }
    
    console.log('✅ Datos de prueba insertados correctamente');
  } catch (error) {
    console.error('❌ Error insertando datos:', error.message);
  } finally {
    db.end();
  }
}

insertTestData(); 