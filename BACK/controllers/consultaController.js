const { Consulta, Paciente, Medico, Especialidade, Diagnostico, Doenca } = require('../models');

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
  try {
    const { id_paciente, pacienteData, ...consultaData } = req.body;

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
