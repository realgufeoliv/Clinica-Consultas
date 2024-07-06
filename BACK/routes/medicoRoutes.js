

const express = require('express');
const router = express.Router();
const medicoController = require('../controllers/medicoController');

router.get('/', medicoController.getAllMedicos);
router.post('/', medicoController.createMedico);
router.put('/', medicoController.updateMedico);
router.delete('/', medicoController.deleteMedico);
router.get('/:id', medicoController.getMedicoById);

module.exports = router;
