const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Especialidade = sequelize.define('Especialidade', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome_especialidade: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  indice: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'especialidade',
  timestamps: false
});

module.exports = Especialidade;
