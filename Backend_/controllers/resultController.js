const db = require('../config/db');

exports.getResults = (req, res) => {
  const { idEleccion } = req.params;
  db.query(
    'SELECT c.idCandidato, c.nombre, COUNT(v.idVoto) as votos FROM Candidato c LEFT JOIN Voto v ON v.idCandidato = c.idCandidato AND v.idEleccion = ? WHERE c.idEleccion = ? GROUP BY c.idCandidato',
    [idEleccion, idEleccion],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};
