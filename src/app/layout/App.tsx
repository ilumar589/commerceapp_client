import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Container } from '@mui/system';
import { Fragment, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { ToastContainer } from 'react-toastify';
import AboutPage from '../../features/about/AboutPage';
import Catalog from '../../features/catalog/Catalog';
import ProductDetails from '../../features/catalog/ProductDetails';
import ContactPage from '../../features/contact/ContactPage';
import HomePage from '../../features/home/HomePage';
import Header from './Header';
import 'react-toastify/dist/ReactToastify.css'
import BasketPage from '../../features/basket/BasketPage';
import agent from '../api/agent';
import CheckoutPage from '../../features/checkout/CheckoutPage';
import { useAppDispatch } from '../store/configureStore';
import { setBasket } from '../../features/basket/basketSlice';

function App() {

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    agent.Basket.get()
      .then(basket => dispatch(setBasket(basket)))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [dispatch]);

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

  if (loading) return (<h1> Loading... </h1>)

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <ToastContainer position='bottom-right' hideProgressBar />
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Container>
          <Routes>
            <Route path='/' element= { <HomePage /> } />
            <Route path='/catalog' element= { <Catalog /> } />
            <Route path='/catalog/:id' element= { <ProductDetails /> } />
            <Route path='/about' element= { <AboutPage /> } />
            <Route path='/contact' element= { <ContactPage /> } />
            <Route path='/basket' element= { <BasketPage /> } />
            <Route path='/checkout' element= { <CheckoutPage/> } />
          </Routes>
        </Container>
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
