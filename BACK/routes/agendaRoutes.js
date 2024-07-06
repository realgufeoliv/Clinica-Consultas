const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agendaController');

router.get('/', agendaController.getAllAgendas);
router.post('/', agendaController.createAgenda);

module.exports = router;
