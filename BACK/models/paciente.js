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
    allowNull: true
  },
  idade: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  endereco: {
    type: DataTypes.STRING(200),  // Corrigido de STRING(1) para STRING(200) ou conforme necessário
    allowNull: true
  },
  CPF: {
    type: DataTypes.STRING(11),
    allowNull: true
  }
}, {
  tableName: 'paciente',
  timestamps: false
});

Paciente.associate = (models) => {
  Paciente.hasMany(models.Consulta, { foreignKey: 'id_paciente' });
};
module.exports = Paciente;
