const Paciente = require('../models/paciente');

exports.getAllPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    res.json(pacientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.create(req.body);
    res.status(201).json(paciente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPacienteById = async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (paciente) {
      res.json(paciente);
    } else {
      res.status(404).json({ error: 'Paciente não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
