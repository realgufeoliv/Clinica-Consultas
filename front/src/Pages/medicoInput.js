import React, { useEffect, useState } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import axios from 'axios';

function MedicoAutocomplete({ value, onChange, especialidade }) {
  const [options, setOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm) {
      const fetchMedico = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/medico/especialidade/${especialidade}/`);
          setOptions(response.data);
        } catch (error) {
          console.error('Error fetching Médicos:', error);
        }
      };

      fetchMedico();
    }
  }, [searchTerm]);

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.nome_medico || ''}
      value={value}
      onChange={(event, newValue) => onChange(newValue)}
      onInputChange={(event, newInputValue) => setSearchTerm(newInputValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Médico"
          margin="normal"
          fullWidth
        />
      )}
    />
  );
}

export default MedicoAutocomplete;
