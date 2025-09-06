const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.login = (req, res) => {
  const { matricula, password } = req.body;
  if (!matricula || !password) {
    return res.status(400).json({ error: 'Matrícula y contraseña requeridas' });
  }
  db.query('SELECT * FROM Estudiante WHERE matricula = ?', [matricula], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });
    const user = results[0];
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
    res.json({ success: true, user: { id: user.idEstudiante, nombre: user.nombre, matricula: user.matricula } });
  });
};

exports.register = (req, res) => {
  const { nombre, matricula, password } = req.body;
  if (!nombre || !matricula || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  const hashed = bcrypt.hashSync(password, 10);
  db.query('INSERT INTO Estudiante (nombre, matricula, password, estado) VALUES (?, ?, ?, ?)',
    [nombre, matricula, hashed, 'activo'],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ success: true, id: result.insertId });
    });
};
