import React from 'react';
import NavClient from '../components/NavClient';
import ProductCard from '../components/ProductCard';
import './styles/customerProduct.css';

export default function CustomerProducts() {
  return (
    <section className="customer-products">
      <NavClient selected="produtos" customer="Nome usuário" showProducts />
      <div className="card_shelf">
        <ProductCard
          name="produto"
          value="2.76"
          image="https://m.media-amazon.com/images/I/61RUepIpfGS._AC_SL1000_.jpg"
          quantity="6"
        />
      </div>
    </section>
  );
}
