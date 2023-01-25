import { useState } from 'react';
import './App.scss';

import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CentralRouter from './router/CentralRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<CentralRouter />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
