const express = require('express');
const router = express.Router();
const electionController = require('../controllers/electionController');

router.get('/elecciones', electionController.getActiveElections);

module.exports = router;
