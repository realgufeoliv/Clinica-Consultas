const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');

router.get('/', consultaController.getAllConsultas);
router.post('/', consultaController.createConsulta);
router.get('/:id', consultaController.getConsultaById);

module.exports = router;
