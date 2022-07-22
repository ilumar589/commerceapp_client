import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Container } from '@mui/system';
import { Fragment, useState } from 'react';
import { Route, Routes } from 'react-router';
import AboutPage from '../../features/about/AboutPage';
import Catalog from '../../features/catalog/Catalog';
import ProductDetails from '../../features/catalog/ProductDetails';
import ContactPage from '../../features/contact/ContactPage';
import HomePage from '../../features/home/HomePage';
import Header from './Header';

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const paletteType = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: darkMode ? '#121212' : '#eaeaea'
      }
    }
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Container>
          <Routes>
            <Route path='/' element= { <HomePage /> } />
            <Route path='/catalog' element= { <Catalog /> } />
            <Route path='/catalog/:id' element= { <ProductDetails /> } />
            <Route path='/about' element= { <AboutPage /> } />
            <Route path='/contact' element= { <ContactPage /> } />
          </Routes>
        </Container>
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
