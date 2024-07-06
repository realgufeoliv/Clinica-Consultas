const Especialidade = require('../models/especialidade');

exports.getAllEspecialidades = async (req, res) => {
  try {
    const especialidades = await Especialidade.findAll();
    res.json(especialidades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createEspecialidade = async (req, res) => {
  try {
    const especialidade = await Especialidade.create(req.body);
    res.status(201).json(especialidade);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEspecialidadeById = async (req, res) => {
  try {
    const especialidade = await Especialidade.findByPk(req.params.id);
    if (especialidade) {
      res.json(especialidade);
    } else {
      res.status(404).json({ error: 'Especialidade not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEspecialidade = async (req, res) => {
  try {
    const especialidade = await Especialidade.findByPk(req.params.id);
    if (especialidade) {
      await especialidade.update(req.body);
      res.json(especialidade);
    } else {
      res.status(404).json({ error: 'Especialidade not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEspecialidade = async (req, res) => {
  try {
    const especialidade = await Especialidade.findByPk(req.params.id);
    if (especialidade) {
      await especialidade.destroy();
      res.json({ message: 'Especialidade deleted' });
    } else {
      res.status(404).json({ error: 'Especialidade not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
