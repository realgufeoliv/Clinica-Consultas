
import React, { useState } from 'react';
import { TextField, Button, Box, Typography,Autocomplete  } from '@mui/material';
import axios from 'axios';
const MarcarConsulta = () => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    mensagem: '',
    especialidade: null,
  });

  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados do formulário
    console.log(formData);
  };

  const handleAutocompleteChange = (event, newValue) => {
    setFormData({ ...formData, search: newValue });
  };

  const handleInputChange = async (event, newInputValue) => {
    setInputValue(newInputValue);
    if (newInputValue) {
      try {
        const response = await axios.get('http://localhost:5000/api/especialidade/getAllEspecialidades').then((response) => {
          console.log(response.data);
          setOptions(response.data)
      
      });
        ; // Ajuste conforme o formato da resposta da API
      } catch (error) {
        console.error('Erro ao buscar dados da API', error);
      }
    } else {
      setOptions([]);
    }
  };
  return (
    <div style={{margin:50}} className="Page">
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ display: 'flex', flexDirection: 'column', maxWidth: 400, margin: '0 auto' }}
    >
      <Typography variant="h4" gutterBottom>Formulário de Marcar Consulta</Typography>
      <TextField
        label="Nome"
        name="nome"
        value={formData.nome}
        onChange={handleChange}
        margin="normal"
        fullWidth
      />
      <TextField
        label="Telefone"
        name="telefone"
        type="tel"
        value={formData.telefone}
        onChange={handleChange}
        margin="normal"
        fullWidth
      />
      <Autocomplete
        value={formData.especialidade}
        onChange={handleAutocompleteChange}
        options={options}
        getOptionLabel={(option) => option.label}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        renderInput={(params) => <TextField {...params} label="Search" variant="outlined" margin="normal" fullWidth />}
        style={{ marginTop: 16 }}
      />
      <TextField
        label="Mensagem"
        name="mensagem"
        value={formData.mensagem}
        onChange={handleChange}
        margin="normal"
        multiline
        rows={4}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
        Enviar
      </Button>
    </Box>
    </div>

  );
};

export default MarcarConsulta;
