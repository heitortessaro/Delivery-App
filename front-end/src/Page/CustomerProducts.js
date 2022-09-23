import React from 'react';
import NavClient from '../components/NavClient';
import './styles/customerProduct.css';

export default function CustomerProducts() {
  return (
    <div className="customer-products">
      <NavClient selected="produtos" customer="Nome usuário" showProducts />
    </div>
  );
}
