

const express = require('express');
const router = express.Router();
const medicoController = require('../controllers/medicoController');

router.get('/', medicoController.getAllMedicos);
router.post('/', medicoController.createMedico);
router.put('/:id', medicoController.updateMedico);
router.delete('/:id', medicoController.deleteMedico);
router.get('/:id', medicoController.getMedicoById);

router.get('/name/:nome', medicoController.getMedicoByName);
module.exports = router;
