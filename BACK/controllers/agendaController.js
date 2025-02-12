const { Agenda, Medico } = require('../models');
const { sequelize } = require('../models'); 

exports.getAllAgendas = async (req, res) => {
  try {
    const agendas = await Agenda.findAll({
      include: [{
        model: Medico,
        required: true // true para um INNER JOIN, false para um LEFT OUTER JOIN
      }]
    });
    res.json(agendas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAgendasByMedico = async (req, res) => {
  console.log(req.params);
  try {
    const { CRM_medico } = req.params;
    
    // Consulta SQL bruta
    const agendas = await sequelize.query(
      'SELECT * FROM agenda WHERE CRM = :CRM_medico',
      {
        replacements: { CRM_medico: Number(CRM_medico) },
        type: sequelize.QueryTypes.SELECT
      }
    );

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

exports.getAgendaById = async (req, res) => {
  try {
    const agenda = await Agenda.findByPk(req.params.id, {
      include: [{
        model: Medico,
        required: true // true para um INNER JOIN, false para um LEFT OUTER JOIN
      }]
    });
    if (agenda) {
      res.json(agenda);
    } else {
      res.status(404).json({ error: 'Agenda not found' });
    }
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
