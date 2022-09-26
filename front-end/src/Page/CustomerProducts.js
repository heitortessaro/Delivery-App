import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import NavClient from '../components/NavClient';
import ProductCard from '../components/ProductCard';
import TotalTag from '../components/TotalTag';
import { getProducts, computeTotalCart } from '../services/productsServices';
import './styles/customerProduct.css';

export default function CustomerProducts() {
  const [products, setProducts] = useLocalStorage({ key: 'products', defaultValue: [] });
  const [total, setTotal] = useState((0).toFixed(2));

  const receiveProducts = async () => {
    const receivedProducts = await getProducts();
    setProducts(receivedProducts);
  };

  const changeQuantity = (id, addQtty, operation) => {
    const index = products.findIndex((p) => p.id === id);
    let newQtty;
    console.log(`addqtty: ${addQtty},    operation: ${operation}`);
    if (operation === 'sum') newQtty = products[index].quantity + addQtty;
    if (operation === 'change' && addQtty >= 0) newQtty = addQtty;
    if (newQtty >= 0) {
      const newProducts = products;
      newProducts[index].quantity = newQtty;
      setProducts(newProducts);
      setTotal(computeTotalCart(products));
    }
  };

  useEffect(() => {
    receiveProducts();
  }, []);

  return (
    <section className="customer-products">
      <NavClient selected="produtos" customer="Nome usuário" showProducts />
      <div className="card_shelf">
        {products.length > 0 && (
          products.map((p) => (
            <ProductCard
              key={ `${p.name + p.id}` }
              name={ p.name }
              value={ p.price }
              image={ p.urlImage }
              quantity={ p.quantity }
              id={ p.id }
              quantityHandler={ changeQuantity }
            />
          ))
        )}
      </div>
      <div className="tag_shelf"><TotalTag total={ total } /></div>
    </section>
  );
}
