import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

const container = document.getElementById('root')!;
const root = createRoot(container);

const theme = {
  primaryColor: '#B47BFF',
  secondaryColor: '#6100e0',
  black: {
    lighter: '#242526',
    darker: '#1B1B1D',
  },
  white: '#E3E3E3',
  text: {
    sigmar: 'font-family: "Sigmar", cursive;',
    nanum: 'font-family: "Nanum Gothic", sans-serif;',
  },
};
const GlobalStyle = createGlobalStyle`
  
  body {
    font-family: 'Nanum Gothic', sans-serif;
    color:  #E3E3E3;
    overflow-x: hidden;
  }

  a {
    text-decoration: none;
  }
`;

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
      <GlobalStyle />
    </ThemeProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
