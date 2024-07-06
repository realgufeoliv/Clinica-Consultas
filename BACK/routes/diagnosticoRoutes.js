const express = require('express');
const router = express.Router();
const diagnosticoController = require('../controllers/diagnosticoController');

router.get('/', diagnosticoController.getAllDiagnosticos);
router.post('/', diagnosticoController.createDiagnostico);
router.put('/', diagnosticoController.updateDiagnostico);
router.delete('/', diagnosticoController.deleteDiagnostico);
router.get('/:id', diagnosticoController.getDiagnosticoById);

module.exports = router;
