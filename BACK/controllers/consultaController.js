const { Consulta, Paciente, Medico, Especialidade, Diagnostico, Doenca } = require('../models');
const { sequelize } = require('../models'); 

exports.getAllConsultas = async (req, res) => {
  try {
        const consultas = await Consulta.findAll({
      include: [{
        model: Paciente,
        required: true // true para um INNER JOIN, false para um LEFT OUTER JOIN
      },{
        model: Medico,
        required: true // true para um INNER JOIN, false para um LEFT OUTER JOIN
      },
      {
        model: Especialidade,
        required: true // true para um INNER JOIN, false para um LEFT OUTER JOIN
      },
      {
        model: Diagnostico,
        required: false ,
        include: [
          {
            model: Doenca,
            required: false
          }]
      }
    ]
    });

    res.json(consultas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createConsulta = async (req, res) => {
  console.log(req.body);

  try {
    const { pacienteData, consultaData } = req.body;

    // Validando os campos obrigatórios do paciente
    const requiredFields = ['nome_paciente', 'telefone'];
    for (const field of requiredFields) {
      if (!pacienteData[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    // Criação do paciente
    let paciente = await Paciente.create({ ...pacienteData });

    // Criação da consulta associando ao ID do paciente criado
    const consulta = await Consulta.create({
      ...consultaData,
      id_paciente: paciente.id, // Associando a consulta ao paciente
    });

    res.status(201).json(consulta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.createNewConsulta = async (req, res) => {
  try {
    console.log(req.body);
    const { id_paciente, pacienteData, consultaData } = req.body;

    let paciente = await Paciente.findByPk(id_paciente);

    if (!paciente) {
      paciente = await Paciente.create({ id: id_paciente, ...pacienteData });
    }

    const consulta = await Consulta.create({
      ...consultaData,
      id_paciente: paciente.id, // Associando a consulta ao paciente
    });

    res.status(201).json(consulta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

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
