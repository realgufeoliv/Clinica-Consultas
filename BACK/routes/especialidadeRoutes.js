const express = require('express');
const router = express.Router();
const especialidadeController = require('../controllers/especialidadeController');

router.get('/', especialidadeController.getAllEspecialidades);
router.post('/', especialidadeController.createEspecialidade);
router.put('/', especialidadeController.updateEspecialidade);
router.delete('/', especialidadeController.deleteEspecialidade);
router.get('/:id', especialidadeController.getEspecialidadeById);

module.exports = router;