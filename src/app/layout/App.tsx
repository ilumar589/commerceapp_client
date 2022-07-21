import React, { useState, useEffect, Fragment } from 'react';
import Catalog from '../../features/catalog/Catalog';
import { Product } from '../models/product';
import { Typography } from '@mui/material';

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
        <Typography variant="h1" component="h2">
          Andreea' Store
        </Typography>
        <Catalog products={products} addProduct={addProduct}/>
    </Fragment>
  );
}

export default App;
