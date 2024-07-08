const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Diagnostico = sequelize.define('Diagnostico', {
  id_diagnostico: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  consulta_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'consulta',
      key: 'id'
    }
  },
  tratamento_recomendado: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  remedios_receitados: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  observacoes: {
    type: DataTypes.STRING(45),
    allowNull: true
  }
}, {
  tableName: 'diagnostico',
  timestamps: false
});


module.exports = Diagnostico;
