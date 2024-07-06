const Medico = require('../models/medico');

exports.getAllMedicos = async (req, res) => {
  try {
    const medicos = await Medico.findAll();
    res.json(medicos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMedico = async (req, res) => {
  try {
    const medico = await Medico.create(req.body);
    res.status(201).json(medico);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMedicoById = async (req, res) => {
  try {
    const medico = await Medico.findByPk(req.params.id);
    if (medico) {
      res.json(medico);
    } else {
      res.status(404).json({ error: 'Medico not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMedico = async (req, res) => {
  try {
    const medico = await Medico.findByPk(req.params.id);
    if (medico) {
      await medico.update(req.body);
      res.json(medico);
    } else {
      res.status(404).json({ error: 'Medico not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMedico = async (req, res) => {
  try {
    const medico = await Medico.findByPk(req.params.id);
    if (medico) {
      await medico.destroy();
      res.json({ message: 'Medico deleted' });
    } else {
      res.status(404).json({ error: 'Medico not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
