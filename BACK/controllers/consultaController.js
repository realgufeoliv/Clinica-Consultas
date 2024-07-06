const Consulta = require('../models/consulta');

exports.getAllConsultas = async (req, res) => {
  try {
    const consultas = await Consulta.findAll();
    res.json(consultas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createConsulta = async (req, res) => {
  try {
    const consulta = await Consulta.create(req.body);
    res.status(201).json(consulta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getConsultaById = async (req, res) => {
  try {
    const consulta = await Consulta.findByPk(req.params.id);
    if (consulta) {
      res.json(consulta);
    } else {
      res.status(404).json({ error: 'Consulta não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
