import { CssBaseline } from '@mui/material';
import { Container } from '@mui/system';
import { useState, useEffect, Fragment } from 'react';
import Catalog from '../../features/catalog/Catalog';
import { Product } from '../models/product';
import Header from './Header';

function App() {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/commerce/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
  }, []);

  function addProduct() {
  //   setProducts(prevState => [...prevState,
  //     {name: 'product' + (prevState.length + 1), price: (prevState.length * 100) + 100}
  //   ]);
  }

  return (
    <Fragment>
        <CssBaseline/>
        <Header/>
        <Container>
          <Catalog products={products} addProduct={addProduct}/>
        </Container>
    </Fragment>
  );
}

export default App;
