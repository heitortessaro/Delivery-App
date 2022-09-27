import React from 'react';
import './styles/totalTag.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function TotalTag(
  { total },
) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      data-testid="customer_products__button-cart"
      className="total_tag"
      disabled={ total === '0.00' }
      onClick={ () => navigate('/customer/checkout') }
    >
      <p data-testid="customer_products__checkout-bottom-value">
        {`Ver Carrinho: R$ ${total.toString().replace('.', ',')}`}
      </p>
    </button>
  );
}

TotalTag.propTypes = {
  total: PropTypes.string.isRequired,
};
