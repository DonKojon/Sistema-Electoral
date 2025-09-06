const db = require('../config/db');

// Simulación simple de blockchain
let blockchain = [];
function addBlock(voto) {
  const prevHash = blockchain.length ? blockchain[blockchain.length - 1].hash : '0';
  const block = {
    index: blockchain.length,
    timestamp: new Date().toISOString(),
    voto,
    prevHash,
    hash: require('crypto').createHash('sha256').update(JSON.stringify(voto) + prevHash).digest('hex')
  };
  blockchain.push(block);
  return block.hash;
}

exports.vote = (req, res) => {
  const { idEstudiante, idCandidato, idEleccion } = req.body;
  if (!idEstudiante || !idCandidato || !idEleccion) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  db.query('SELECT idVoto FROM Voto WHERE idEstudiante = ? AND idEleccion = ?', [idEstudiante, idEleccion], (err, existingVotes) => {
    if (err) {
      console.error('Error verificando votos existentes:', err);
      return res.status(500).json({ error: 'Error al verificar votos existentes' });
    }
    if (existingVotes.length > 0) {
      return res.status(400).json({ error: 'Ya has votado en esta elección' });
    }
    db.query('SELECT estado FROM ActoElectoral WHERE idEleccion = ?', [idEleccion], (err, eleccion) => {
      if (err) {
        console.error('Error verificando elección:', err);
        return res.status(500).json({ error: 'Error al verificar la elección' });
      }
      if (eleccion.length === 0) {
        return res.status(404).json({ error: 'Elección no encontrada' });
      }
      if (eleccion[0].estado !== 'activa') {
        return res.status(400).json({ error: 'Esta elección no está activa' });
      }
      db.query('INSERT INTO Voto (idEstudiante, idCandidato, idEleccion) VALUES (?, ?, ?)', [idEstudiante, idCandidato, idEleccion], (err, result) => {
        if (err) {
          console.error('Error insertando voto:', err);
          return res.status(500).json({ error: 'Error al registrar el voto' });
        }
        const hash = addBlock({ idEstudiante, idCandidato, idEleccion });
        db.query('UPDATE Voto SET hashTransaccion = ? WHERE idVoto = ?', [hash, result.insertId], (err) => {
          if (err) {
            console.error('Error actualizando hash:', err);
          }
        });
        res.json({ success: true, hash, message: 'Voto registrado exitosamente' });
      });
    });
  });
};

exports.getBlockchain = (req, res) => {
  res.json(blockchain);
};
