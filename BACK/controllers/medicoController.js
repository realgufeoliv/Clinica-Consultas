const { Medico, Agenda, Especialidade } = require('../models');
const { sequelize } = require('../models'); 
const Op = sequelize.Op;

exports.getAllMedicos = async (req, res) => {
  try {
    const medicos = await Medico.findAll({
      include: [{
        model: Agenda,
        required: true // true para um INNER JOIN, false para um LEFT OUTER JOIN
      }]
    });
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
    const medico = await Medico.findByPk(req.params.id, {
      include: [{
        model: Agenda,
        required: true // true para um INNER JOIN, false para um LEFT OUTER JOIN
      }]
    });
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

exports.getMedicoByName = async (req, res) => {
  try {
    const {  especialidade_id } = req.params;

    const query = `
    SELECT m.*, e.*
    FROM medico m
    LEFT JOIN exerce ex ON m.CRM = ex.CRM_medico
    LEFT JOIN especialidade e ON ex.id_especialidade = e.id
    WHERE e.id = :especialidade_id`;

    const replacements = {  especialidade_id: `${especialidade_id}`};
    

    const medicos = await sequelize.query(query, {
      replacements,
      type: sequelize.QueryTypes.SELECT
    });

    if (medicos.length > 0) {
      console.log(`Encontrados ${medicos.length} médicos.`);
      res.json(medicos);
    } else {
      console.log('Nenhum médico encontrado.');
      res.status(404).json({ error: 'Medico not found' });
    }
  } catch (err) {
    console.error('Erro ao buscar médicos:', err);
    res.status(500).json({ error: err.message });
  }
};
