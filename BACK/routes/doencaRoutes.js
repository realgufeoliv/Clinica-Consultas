const express = require('express');
const router = express.Router();
const doencaController = require('../controllers/doencaController');

router.get('/', doencaController.getAllDoenca);
router.post('/', doencaController.createDoenca);
router.put('/', doencaController.updateDoenca);
router.delete('/', doencaController.deleteDoenca);
router.get('/:id', doencaController.getDoencaById);

module.exports = router;
