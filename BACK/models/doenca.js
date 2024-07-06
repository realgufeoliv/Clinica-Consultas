const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Doenca = sequelize.define('Doenca', {
  id_doenca: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome_doenca: {
    type: DataTypes.STRING(200),
    allowNull: false
  }
}, {
  tableName: 'doenca',
  timestamps: false
});

module.exports = Doenca;
