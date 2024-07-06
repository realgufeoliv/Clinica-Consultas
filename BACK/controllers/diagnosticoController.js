const Diagnostico = require('../models/diagnostico');

exports.getAllDiagnosticos = async (req, res) => {
  try {
    const diagnosticos = await Diagnostico.findAll();
    res.json(diagnosticos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createDiagnostico = async (req, res) => {
  try {
    const diagnostico = await Diagnostico.create(req.body);
    res.status(201).json(diagnostico);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDiagnosticoById = async (req, res) => {
  try {
    const diagnostico = await Diagnostico.findByPk(req.params.id);
    if (diagnostico) {
      res.json(diagnostico);
    } else {
      res.status(404).json({ error: 'Diagnostico not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDiagnostico = async (req, res) => {
  try {
    const diagnostico = await Diagnostico.findByPk(req.params.id);
    if (diagnostico) {
      await diagnostico.update(req.body);
      res.json(diagnostico);
    } else {
      res.status(404).json({ error: 'Diagnostico not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDiagnostico = async (req, res) => {
  try {
    const diagnostico = await Diagnostico.findByPk(req.params.id);
    if (diagnostico) {
      await diagnostico.destroy();
      res.json({ message: 'Diagnostico deleted' });
    } else {
      res.status(404).json({ error: 'Diagnostico not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
