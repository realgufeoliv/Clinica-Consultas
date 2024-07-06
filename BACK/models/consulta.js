const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Consulta = sequelize.define('Consulta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
  PAGOU: {
    type: DataTypes.STRING(3),
    allowNull: false
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
      model: 'paciente',
      key: 'id'
    }
  },
  CRM_medico: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'medico',
      key: 'id'
    }
  },
  id_especialidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'especialidade',
      key: 'id'
    }
  },
}, {
  tableName: 'consulta',
  timestamps: false
});

module.exports = Consulta;