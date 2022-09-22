import React from 'react';
import './styles/navClient.css';

export default function CustomerProducts(selected, customer) {
  return (
    <nav className="navbar">
      <div>
        <button
          className={ `bts-products ${selected === produtos ? 'selected' : ''}` }
          type="button"
          data-testid="customer_products__element-navbar-link-products"
        >
          PRODUTOS
        </button>
        <button
          className={ `bts-products ${selected === pedidos ? 'selected' : ''}` }
          data-testid="customer_products__element-navbar-link-orders"
          type="button"
        >
          MEUS PEDIDOS
        </button>
      </div>
      <div>
        <button
          className="bts-products customer"
          data-testid="customer_products__element-navbar-user-full-name"
          type="button"
        >
          {customer}
        </button>
        <button
          className="bts-products logout"
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
        >
          Sair
        </button>
      </div>
    </nav>
  );
}
