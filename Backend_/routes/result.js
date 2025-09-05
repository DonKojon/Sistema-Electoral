const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

router.get('/resultados/:idEleccion', resultController.getResults);

module.exports = router;
