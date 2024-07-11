const Especialidade = require('../models/especialidade');

exports.getAllEspecialidades = async (req, res) => {
  try {
    const especialidades = await Especialidade.findAll();
    res.json(especialidades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEspecialidadesByNome = async (req, res) => {
  const { nome_especialidade } = req.query;

  try {
    const especialidades = await Especialidade.findAll({
      where: {
        nome_especialidade: {
          [Op.iLike]: `%${nome_especialidade}%`
        }
      }
    });

    res.json(especialidades);
  } catch (err) {
    console.error('Erro ao buscar especialidades:', err);
    res.status(500).json({ error: 'Erro ao buscar especialidades' });
  }
};

exports.createEspecialidade = async (req, res) => {
  try {
    const especialidade = await Especialidade.create(req.body);
    res.status(201).json(especialidade);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEspecialidadeById = async (req, res) => {
  try {
    const especialidade = await Especialidade.findByPk(req.params.id);
    if (especialidade) {
      res.json(especialidade);
    } else {
      res.status(404).json({ error: 'Especialidade not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEspecialidade = async (req, res) => {
  try {
    const especialidade = await Especialidade.findByPk(req.params.id);
    if (especialidade) {
      await especialidade.update(req.body);
      res.json(especialidade);
    } else {
      res.status(404).json({ error: 'Especialidade not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEspecialidade = async (req, res) => {
  try {
    const especialidade = await Especialidade.findByPk(req.params.id);
    if (especialidade) {
      await especialidade.destroy();
      res.json({ message: 'Especialidade deleted' });
    } else {
      res.status(404).json({ error: 'Especialidade not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
