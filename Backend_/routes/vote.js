const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');

router.post('/votar', voteController.vote);
router.get('/blockchain', voteController.getBlockchain);

module.exports = router;
