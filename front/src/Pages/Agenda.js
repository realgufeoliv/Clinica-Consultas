import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, Box } from '@mui/material';
import axios from 'axios';

const Agenda = ({ formData, onChange, crmMedico }) => {
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);

  useEffect(() => {
    async function fetchHorariosDisponiveis() {
      try {
        const response = await axios.get(`http://localhost:5000/api/agenda/getAgendaMedico/${crmMedico}`);
        // Verifica se a resposta possui dados e se é um array com pelo menos um elemento
        if (response.data && response.data.length > 0) {
          const agenda = response.data[0]; // A API retorna um único objeto em um array
          const horariosComDisponibilidade = calcularIntervaloHoras(agenda.hora_inicio, agenda.hora_fim).map((horario, index) => ({
            id: index,
            dia_semana: agenda.dia_semana,
            hora_inicio: horario.hora_inicio,
            hora_fim: horario.hora_fim, // Adiciona hora_fim à estrutura de dados do horário
            disponivel: true // Assumindo que todos os horários recebidos são inicialmente disponíveis
          }));
          setHorariosDisponiveis(horariosComDisponibilidade);
        } else {
          console.error('Resposta da API vazia ou formato inesperado:', response);
        }
      } catch (error) {
        console.error('Erro ao buscar horários disponíveis:', error);
      }
    }
    if (crmMedico) {
      fetchHorariosDisponiveis();
    }
  }, [crmMedico]);

  const handleReservarHorario = (id) => {
    // Atualizando o estado do horário reservado
    const horarioSelecionado = horariosDisponiveis.find(horario => horario.id === id);
    onChange({ ...formData, selectedHorario: horarioSelecionado });
    setHorarioSelecionado(horarioSelecionado);
  };

  const calcularIntervaloHoras = (horaInicio, horaFim) => {
    const intervalos = [];
    let [horaAtual, minutoAtual] = horaInicio.split(':').map(Number);
    const [horaFinal, minutoFinal] = horaFim.split(':').map(Number);

    while (horaAtual < horaFinal || (horaAtual === horaFinal && minutoAtual < minutoFinal)) {
      const horaInicioFormatada = `${horaAtual.toString().padStart(2, '0')}:${minutoAtual.toString().padStart(2, '0')}`;
      minutoAtual += 60; // Adiciona 60 minutos (1 hora)
      if (minutoAtual >= 60) {
        minutoAtual -= 60;
        horaAtual += 1;
      }
      const horaFimFormatada = `${horaAtual.toString().padStart(2, '0')}:${minutoAtual.toString().padStart(2, '0')}`;
      intervalos.push({ hora_inicio: horaInicioFormatada, hora_fim: horaFimFormatada });
    }

    return intervalos;
  };

  return (
    <div style={{ margin: '15px 0px' }}>
      <Typography variant="h6" gutterBottom>Selecione um horário disponível:</Typography>
      {horarioSelecionado ? (
        <Box
          sx={{
            padding: 2,
            border: '1px solid #ccc',
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Typography variant="subtitle1" gutterBottom>Horário Selecionado:</Typography>
          <Typography variant="body1">{horarioSelecionado.dia_semana}, {horarioSelecionado.hora_inicio} - {horarioSelecionado.hora_fim}</Typography>
        </Box>
      ) : (
        <Box
          sx={{
            maxHeight: '400px',
            overflowY: 'auto',
            padding: 2,
            border: '1px solid #ccc',
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Grid container spacing={3}>
            {horariosDisponiveis.map((horario) => (
              <Grid item xs={12} key={horario.id}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="subtitle1" gutterBottom>{horario.dia_semana}</Typography>
                    <Typography variant="body1" gutterBottom>{horario.hora_inicio} - {horario.hora_fim}</Typography>
                  </Box>
                  {horario.disponivel ? (
                    <Button variant="contained" color="primary" onClick={() => handleReservarHorario(horario.id)}>
                      Reservar
                    </Button>
                  ) : (
                    <Typography variant="body2" color="error">
                      Indisponível
                    </Typography>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </div>
  );
};

export default Agenda;
