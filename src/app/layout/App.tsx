import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Container } from '@mui/system';
import { Fragment, useCallback, useEffect, useState } from 'react';
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
import CheckoutPage from '../../features/checkout/CheckoutPage';
import { useAppDispatch } from '../store/configureStore';
import { fetchBasketAsync, setBasket } from '../../features/basket/basketSlice';
import Login from '../../features/auth/Login';
import Register from '../../features/auth/Register';
import { fetchCurrentUser } from '../../features/auth/authSlice';

function App() {

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  const initApp = useCallback(async () =>  {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch(error) {
      console.log(error);
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => setLoading(false))
  }, [initApp]);

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
            <Route path='/login' element= { <Login/> } />
            <Route path='/register' element= { <Register/> } />
          </Routes>
        </Container>
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
