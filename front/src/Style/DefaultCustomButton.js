import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import theme from './globalStyle';
const defaultHeaderButton = styled(Button)(( ) => ({
  backgroundColor: 'white',
  color: 'black',
    border: '1px solid black',
    margin: theme.spacing(1.5),
  '&:hover': {
    backgroundColor: '#f0f0f0',
    border: '1px solid black',

  },
  '&:active': {
    backgroundColor: '#a9a9a9', 
    border: '1px solid black',
    // Cor quando o botão é clicado
  },
  '&.Mui-selected': {
    backgroundColor: '#d3d3d3', // Cor quando o botão é selecionado
  },
})); 

export default defaultHeaderButton;