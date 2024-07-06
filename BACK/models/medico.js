const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Medico = sequelize.define('Medico', {
  CRM: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  percentual: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING(11),
    allowNull: false
  },
  nome_medico: {
    type: DataTypes.STRING(200),
    allowNull: false
  }
}, {
  tableName: 'medico',
  timestamps: false
});

module.exports = Medico;
