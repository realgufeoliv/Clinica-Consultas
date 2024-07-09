const Medico = require('../models/medico');
const { sequelize } = require('../models'); // Supondo que seus modelos estejam definidos em '../models'
const Op = sequelize.Op;

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

exports.getMedicoByName = async (req, res) => {
  try {
    const { nome } = req.params;
    console.log(`Buscando médicos com nome parecido com: ${nome}`);

    const query = `
      SELECT * FROM medico
      WHERE nome_medico LIKE :nome`;

    const replacements = { nome: `%${nome}%` };


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
