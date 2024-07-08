const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');

router.get('/getConsultas', consultaController.getAllConsultas);
router.post('/setConsulta', consultaController.createConsulta);
router.get('/:id', consultaController.getConsultaById);

module.exports = router;
