import React, { useEffect, useState } from 'react';
import NavClient from '../components/NavClient';
import ProductCard from '../components/ProductCard';
import { getProducts, computeTotalCart } from '../services/productsServices';
import './styles/customerProduct.css';

export default function CustomerProducts() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const receiveProducts = async () => {
    const receivedProducts = await getProducts();
    setProducts(receivedProducts);
  };

  const changeQuantity = (i, addQtty) => {
    const newQtty = products[i].quantity + addQtty;
    if (newQtty >= 0) {
      const newProducts = products;
      newProducts[i].quantity = newQtty;
      setProducts(newProducts);
      setTotal(computeTotalCart(products));
    }
  };

  useEffect(() => {
    receiveProducts();
  });

  console.log(total);
  return (
    <section className="customer-products">
      <NavClient selected="produtos" customer="Nome usuário" showProducts />
      <div className="card_shelf">
        {products.length > 0 && (
          products.map((p, i) => (
            <ProductCard
              key={ `${p.name + i}` }
              name={ p.name }
              value={ p.value }
              image={ p.image }
              quantity={ p.quantity }
              id={ i }
              quantityHandler={ changeQuantity }
            />
          ))
        )}
      </div>
    </section>
  );
}
