const express = require('express');
const app = express();
require('dotenv').config();
const agendaRoutes = require('./routes/agendaRoutes');

app.use(express.json());

app.use('/api/agenda', agendaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
