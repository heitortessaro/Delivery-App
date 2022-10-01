import React from 'react';
import PropTypes from 'prop-types';
import { returnDate } from '../services/ordersService';

export default function SaleDetail({ role, sale }) {
  return (
    <div>
      <h2>Detalhes do pedido</h2>
      <span
        data-testid={ `${role}_order_details__element-order-details-label-order-id` }
      >
        PEDIDO
        {' '}
        {`000${sale.id}`}
      </span>
      {role === 'customer' && (
        <span
          data-testid={ `${role}_order_details__element-order-details-label-seller-name` }
        >
          {' '}
          P. Vend:
          {sale.seller.name}
        </span>
      )}
      <span
        data-testid={ `${role}_order_details__element-order-details-label-order-date` }
      >
        {returnDate(sale.saleDate)}
      </span>
      <span
        data-testid={ `${role}_order_details__element-order-details-`
        + 'label-delivery-status' }
      >
        {sale.status}
      </span>
      {role === 'customer' ? (
        <button
          type="submit"
          data-testid={ `${role}_order_details__button-delivery-check` }
          disabled
        >
          {' '}
          MARCAR COMO ENTREGUE
          {' '}

        </button>)
        : (
          <div>
            <button
              type="submit"
              data-testid="seller_order_details__button-preparing-check"
            >
              {' '}
              PREPARAR PEDIDO
              {' '}

            </button>
            <button
              type="submit"
              data-testid="seller_order_details__button-dispatch-check"
              disabled
            >
              {' '}
              SAIU PARA ENTREGA
              {' '}

            </button>
          </div>
        )}
    </div>
  );
}

SaleDetail.propTypes = {
  sale: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    sellerId: PropTypes.number,
    totalPrice: PropTypes.string,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
    saleDate: PropTypes.string,
    status: PropTypes.string,
    products: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      price: PropTypes.string,
      urlImage: PropTypes.string,
      sales_products: PropTypes.shape({
        quantity: PropTypes.number,
      }),
    })),
    seller: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
      password: PropTypes.string,
      role: PropTypes.string,
    }),
  }).isRequired,
  role: PropTypes.string.isRequired,
};
