const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Paciente = sequelize.define('Paciente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome_paciente: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING(11),
    allowNull: false
  },
  sexo: {
    type: DataTypes.STRING(1),
    allowNull: false
  },
  idade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  endereco: {
    type: DataTypes.STRING(1),
    allowNull: false
  },
  CPF: {
    type: DataTypes.STRING(11),
    allowNull: false
  }
}, {
  tableName: 'paciente',
  timestamps: false
});

module.exports = Paciente;
