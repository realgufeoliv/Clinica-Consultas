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

exports.updateAgenda = async (req, res) => {
  try {
    const agenda = await Agenda.findByPk(req.params.id);
    if (agenda) {
      await agenda.update(req.body);
      res.json(agenda);
    } else {
      res.status(404).json({ error: 'Agenda not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAgenda = async (req, res) => {
  try {
    const agenda = await Agenda.findByPk(req.params.id);
    if (agenda) {
      await agenda.destroy();
      res.json({ message: 'Agenda deleted' });
    } else {
      res.status(404).json({ error: 'Agenda not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
