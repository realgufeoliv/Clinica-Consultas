const Agenda = require('../models/agenda');

exports.getAllAgendas = async (req, res) => {
  try {
    const agendas = await Agenda.findAll();
    res.json(agendas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAgenda = async (req, res) => {
  try {
    const agenda = await Agenda.create(req.body);
    res.status(201).json(agenda);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
