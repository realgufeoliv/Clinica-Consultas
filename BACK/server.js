const express = require('express');
const app = express();

require('dotenv').config();
const agendaRoutes = require('./routes/agendaRoutes');
const consultaRoutes = require('./routes/consultaRoutes');
const diagnosticoRoutes = require('./routes/diagnosticoRoutes');
const especialidadeRoutes = require('./routes/especialidadeRoutes');
const medicoRoutes = require('./routes/medicoRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const doencaRoutes = require('./routes/doencaRoutes');

app.use(express.json());

app.use('/api/agenda', agendaRoutes);
app.use('/api/consulta', consultaRoutes);
app.use('/api/paciente', pacienteRoutes);
app.use('/api/medico', medicoRoutes);
app.use('/api/diagnostico', diagnosticoRoutes);
app.use('/api/especialidade', especialidadeRoutes);
app.use('/api/doenca', doencaRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
