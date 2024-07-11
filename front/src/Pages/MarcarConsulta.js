import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Select, MenuItem, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import MedicoAutocomplete from './medicoInput';
import axios from 'axios';
import Agenda from './Agenda';

const MarcarConsulta = () => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    especialidade: '',
    selectedMedico: null,
    selectedHorario: null,
  });

  const [options, setOptions] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Estado para controlar a exibição do Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Mensagem a ser exibida no Snackbar

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMedicoChange = (newMedico) => {
    setFormData({ ...formData, selectedMedico: newMedico });
  };

  const handleAgendaChange = (newFormData) => {
    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const pacienteData = {
        nome_paciente: formData.nome,
        telefone: formData.telefone,
      };

      const consultaData = {
        hora_inicio: formData.selectedHorario.hora_inicio,
        hora_fim: formData.selectedHorario.hora_fim,
        data: formData.selectedHorario.dia_semana,
        CRM_medico: formData.selectedMedico.CRM,
        id_especialidade: formData.especialidade,
      };

      await axios.post('http://localhost:5000/api/consulta/setConsulta', {
        pacienteData,
        consultaData,
      });

      // Após o envio bem-sucedido, exibe o Snackbar
      setSnackbarMessage('Consulta marcada com sucesso!');
      setSnackbarOpen(true);

      // Limpa o formulário (opcional)
      setFormData({
        nome: '',
        telefone: '',
        especialidade: '',
        selectedMedico: null,
        selectedHorario: null,
      });

    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  useEffect(() => {
    async function fetchEspecialidades() {
      try {
        const response = await axios.get('http://localhost:5000/api/especialidade/getAllEspecialidades');
        setOptions(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados da API', error);
      }
    }
    fetchEspecialidades();
  }, []);

  return (
    <div style={{ margin: 50 }} className="Page">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', maxWidth: 450, margin: '0 auto' }}
      >
        <Typography variant="h4" gutterBottom>Formulário de Marcar Consulta</Typography>
        <TextField
          label="Nome do Paciente"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Telefone do Paciente"
          name="telefone"
          type="tel"
          value={formData.telefone}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />

        <Select
          name="especialidade"
          value={formData.especialidade}
          onChange={handleChange}
          margin="normal"
          fullWidth
          displayEmpty
        >
          <MenuItem value="" disabled>
            <em>Selecione uma especialidade</em>
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.nome_especialidade}
            </MenuItem>
          ))}
        </Select>

        <MedicoAutocomplete
          value={formData.selectedMedico}
          especialidade={formData.especialidade}
          onChange={handleMedicoChange}
        />

        {/* Integração do componente de Agenda com handleAgendaChange */}
        {formData.selectedMedico && (
          <Agenda
            formData={formData}
            onChange={handleAgendaChange}
            crmMedico={formData.selectedMedico.CRM} // Passando o CRM do médico selecionado para a Agenda
          />
        )}

        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Enviar
        </Button>

        {/* Snackbar para exibir mensagem de sucesso */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000} // Duração em milissegundos que o Snackbar fica visível
          onClose={handleSnackbarClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleSnackbarClose}
            severity="success"
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>

      </Box>
    </div>
  );
};

export default MarcarConsulta;
