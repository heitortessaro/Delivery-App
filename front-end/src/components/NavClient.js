import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles/navClient.css';

export default function CustomerProducts({ selected, customer, showProducts, manage }) {
  // const pedidos = showProducts ? 'Meus Pedidos' : 'Pedidos';
  let infobutton = '';
  const navigate = useNavigate();
  const logoutFun = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (!manage) {
    if (showProducts) {
      infobutton = 'Meus Pedidos';
    } else infobutton = 'Pedidos';
  } else infobutton = 'Gerenciar Usuarios';

  return (
    <nav className="navbar_bg">
      <div>
        {showProducts && (
          <button
            className={ ` ${selected === 'produtos' ? 'selected' : 'no_selected'}` }
            type="button"
            data-testid="customer_products__element-navbar-link-products"
            onClick={ () => navigate('/customer/products') }
          >
            PRODUTOS
          </button>
        )}
        <button
          className={ ` ${selected === 'pedidos' ? 'selected' : 'no_selected'}` }
          data-testid="customer_products__element-navbar-link-orders"
          type="button"
          onClick={ () => navigate('/customer/checkout') }
        >
          { infobutton }
        </button>
      </div>
      <div>
        <button
          className="customer"
          data-testid="customer_products__element-navbar-user-full-name"
          type="button"
          onClick={ () => navigate('') }
        >
          {customer}
        </button>
        <button
          className="logout"
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
          onClick={ () => logoutFun() }
        >
          Sair
        </button>
      </div>
    </nav>
  );
}

CustomerProducts.propTypes = {
  selected: PropTypes.string.isRequired,
  customer: PropTypes.string.isRequired,
  showProducts: PropTypes.bool.isRequired,
  manage: PropTypes.bool.isRequired,
};
