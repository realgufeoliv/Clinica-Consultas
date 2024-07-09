const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Consulta = sequelize.define('Consulta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true  // Adicione autoIncrement se o campo for auto incrementado
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false
  },
  hora_inicio: {
    type: DataTypes.TIME,
    allowNull: false
  },
  hora_fim: {
    type: DataTypes.TIME,
    allowNull: false
  },
  pagou: {
    type: DataTypes.STRING(3),
    allowNull: true
  },
  forma_pagamento: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  valor_pagamento: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  id_paciente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Paciente',  // Nome do modelo ao invés do nome da tabela
      key: 'id'
    }
  },
  CRM_medico: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Medico',  // Nome do modelo ao invés do nome da tabela
      key: 'id'
    }
  },
  id_especialidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Especialidade',  // Nome do modelo ao invés do nome da tabela
      key: 'id'
    }
  },
}, {
  tableName: 'consulta',
  timestamps: false
});

// Definir associações
Consulta.associate = (models) => {
  Consulta.belongsTo(models.Paciente, { foreignKey: 'id_paciente' });
  Consulta.belongsTo(models.Medico, { foreignKey: 'CRM_medico' });
  Consulta.belongsTo(models.Especialidade, { foreignKey: 'id_especialidade' });
  Consulta.hasOne(models.Diagnostico, { foreignKey: 'consulta_id' });
};

module.exports = Consulta;
