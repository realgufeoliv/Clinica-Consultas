import axios from 'axios';
import styled from '@mui/material/styles/styled';
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
function VerConsultas() {
    const [consultas, setConsultas] = useState([]);
    useEffect(() => {
        async function fetchConsultas() {
            try {
                const response = await axios.get('http://localhost:5000/api/consulta/getConsultas');
                setConsultas(response.data);
                console.log(consultas ,'consultasList');
            } catch (error) {
                console.log(error);
            }
        }
        fetchConsultas();
    }, []); // Empty dependency array means this effect runs once on mount
    return (
        <div className="Page">
            <h1>Todas as Consultas</h1>
            <div>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">data</StyledTableCell>
            <StyledTableCell align="right">Hora Início</StyledTableCell>
            <StyledTableCell align="right">Hora Fim</StyledTableCell>
            <StyledTableCell align="right">Paciente</StyledTableCell>
            <StyledTableCell align="right">Médico</StyledTableCell>
            <StyledTableCell align="right">Especialidade</StyledTableCell>
            <StyledTableCell align="right">Tratamento</StyledTableCell>
            <StyledTableCell align="right">Doenças</StyledTableCell>
            <StyledTableCell align="right">Pagou</StyledTableCell>



          </TableRow>
        </TableHead>
        <TableBody>
          {consultas.map((row,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="left">{row.data}</StyledTableCell>

              <StyledTableCell align="right">{row.hora_inicio}</StyledTableCell>
              <StyledTableCell align="right">{row.hora_fim}</StyledTableCell>
                <StyledTableCell align="right">{row.Paciente.nome_paciente}</StyledTableCell>
                <StyledTableCell align="right">{row.Medico.nome_medico}</StyledTableCell>
                <StyledTableCell align="right">{row.Especialidade.nome_especialidade}</StyledTableCell>
                <StyledTableCell align="right">{row.Diagnostico != null ? row.Diagnostico.tratamento_recomendado :'Sem Diagnostico'}</StyledTableCell>
                <StyledTableCell align="right">{row.Diagnostico != null ? row.Diagnostico.Doencas.map((doenca)=> doenca.nome_doenca) :'Sem Diagnostico'}</StyledTableCell>
                <StyledTableCell align="right">{row.pagou != null ? row.pagou : 'Não'}</StyledTableCell>



            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </div>
        </div>
    );
}

export default VerConsultas;