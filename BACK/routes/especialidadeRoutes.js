const express = require('express');
const router = express.Router();
const especialidadeController = require('../controllers/especialidadeController');

router.get('/getAllEspecialidades', especialidadeController.getAllEspecialidades);
router.post('/', especialidadeController.createEspecialidade);
router.put('/', especialidadeController.updateEspecialidade);
router.delete('/', especialidadeController.deleteEspecialidade);

module.exports = router;