const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agendaController');

router.get('/', agendaController.getAllAgendas);
router.post('/', agendaController.createAgenda);

router.get('/getAgendaMedico/:CRM_medico', agendaController.getAllAgendasByMedico);
module.exports = router;
