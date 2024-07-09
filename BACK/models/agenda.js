const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Medico = require('./medico');  

const Agenda = sequelize.define('Agenda', {
  id_agenda: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  CRM: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'Medico',
        key: 'CRM'
    }
  },
  dia_semana: {
    type: DataTypes.STRING(3),
    allowNull: true,
  },
  hora_inicio: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  hora_fim: {
    type: DataTypes.TIME,
    allowNull: false,
  },
}, {
  tableName: 'agenda',
  timestamps: false,
});

// Definir associações
Agenda.associate = (models) => {
  Agenda.belongsTo(models.Medico, { foreignKey: 'CRM' });
};

module.exports = Agenda;
