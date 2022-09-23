import React from 'react';
import './styles/navClient.css';

export default function CustomerProducts({ selected, customer, showProducts }) {
  return (
    <nav className="navbar_bg">
      <div>
        {showProducts && (
          <button
            className={ ` ${selected === 'produtos' ? 'selected' : 'no_selected'}` }
            type="button"
            data-testid="customer_products__element-navbar-link-products"
          >
            PRODUTOS
          </button>
        )}
        <button
          className={ ` ${selected === 'pedidos' ? 'selected' : 'no_selected'}` }
          data-testid="customer_products__element-navbar-link-orders"
          type="button"
        >
          MEUS PEDIDOS
        </button>
      </div>
      <div>
        <button
          className="customer"
          data-testid="customer_products__element-navbar-user-full-name"
          type="button"
        >
          {customer}
        </button>
        <button
          className="logout"
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
        >
          Sair
        </button>
      </div>
    </nav>
  );
}
