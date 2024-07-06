const Doenca = require('../models/doenca');

exports.getAllDoenca = async (req, res) => {
  try {
    const doencas = await Doenca.findAll();
    res.json(doencas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createDoenca = async (req, res) => {
  try {
    const doenca = await Doenca.create(req.body);
    res.status(201).json(doenca);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDoencaById = async (req, res) => {
  try {
    const doenca = await Doenca.findByPk(req.params.id);
    if (doenca) {
      res.json(doenca);
    } else {
      res.status(404).json({ error: 'Doenca not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDoenca = async (req, res) => {
  try {
    const doenca = await Doenca.findByPk(req.params.id);
    if (doenca) {
      await doenca.update(req.body);
      res.json(doenca);
    } else {
      res.status(404).json({ error: 'Doenca not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDoenca = async (req, res) => {
  try {
    const doenca = await Doenca.findByPk(req.params.id);
    if (doenca) {
      await doenca.destroy();
      res.json({ message: 'Doenca deleted' });
    } else {
      res.status(404).json({ error: 'Doenca not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
