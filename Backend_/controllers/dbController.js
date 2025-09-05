const db = require('../config/db');

exports.getStatus = (req, res) => {
  db.ping((err) => {
    if (err) {
      res.status(500).json({ status: 'error', error: err.message });
    } else {
      res.json({ status: 'ok' });
    }
  });
};
