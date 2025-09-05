const db = require('../config/db');

exports.getActiveElections = (req, res) => {
  db.query('SELECT e.idEleccion, e.inicio, e.cierre, e.estado, c.idCandidato, c.nombre as candidato, c.partido FROM ActoElectoral e LEFT JOIN Candidato c ON c.idEleccion = e.idEleccion WHERE e.estado = "activa"', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    // Agrupa candidatos por elección
    const elecciones = {};
    results.forEach(row => {
      if (!elecciones[row.idEleccion]) {
        elecciones[row.idEleccion] = {
          idEleccion: row.idEleccion,
          inicio: row.inicio,
          cierre: row.cierre,
          estado: row.estado,
          candidatos: []
        };
      }
      if (row.idCandidato) {
        elecciones[row.idEleccion].candidatos.push({ id: row.idCandidato, nombre: row.candidato, partido: row.partido });
      }
    });
    res.json(Object.values(elecciones));
  });
};
