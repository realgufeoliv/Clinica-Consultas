const sequelize = require('../config/database');
const Paciente = require('./paciente');
const Consulta = require('./consulta');
const Medico = require('./medico');
const Diagnostico = require('./diagnostico');
const Especialidade = require('./especialidade');
const Doenca = require('./doenca');


// Invocar as associações aqui
Paciente.associate({ Consulta });
Consulta.associate({ Paciente, Medico, Especialidade, Diagnostico });
Medico.associate = (models) => {
  Medico.hasMany(models.Consulta, { foreignKey: 'CRM_medico' });
};
Especialidade.associate = (models) => {
  Especialidade.hasMany(models.Consulta, { foreignKey: 'id_especialidade' });
};

Diagnostico.associate = (models) => {
  Diagnostico.belongsToMany(models.Doenca, { through: 'diagnostica', foreignKey: 'id_diagnostico',  timestamps: false});
};

Doenca.associate = (models) => {
  Doenca.belongsToMany(models.Diagnostico, { through: 'diagnostica', foreignKey: 'id_doenca', timestamps: false });
};




Diagnostico.associate({ Doenca });
Doenca.associate({ Diagnostico });


  
module.exports = {
  sequelize,
  Paciente,
  Consulta,
  Medico,
  Especialidade,
  Diagnostico,
  Doenca,

};
