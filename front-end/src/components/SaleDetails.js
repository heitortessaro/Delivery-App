import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';

export default function SaleDetail({ userRole, sale }) {
  return (
    <div>
      <h2>Detalhes do pedido</h2>
      <span data-testid="customer_order_details__element-order-details-label-order-id">
        PEDIDO
        {' '}
        {`000${sale.id}`}
      </span>
      {userRole === 'costumer' && (
        <span
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          {' '}
          P. Vend:
          {sale.seller.name}
        </span>
      )}
      <span data-testid="customer_order_details__element-order-details-label-order-date">
        {sale.saleDate}
      </span>
      <span
        data-testid="customer_order_details__element-order-details-label-delivery-status"
      >
        {sale.status}
      </span>
      {userRole === 'costumer' ? (
        <button
          type="submit"
          data-testid="customer_order_details__button-delivery-check"
        >
          {' '}
          MARCAR COMO ENTREGUE
          {' '}

        </button>)
        : (
          <div>
            <button type="submit"> PREPARAR PEDIDO </button>
            <button type="submit"> SAIU PARA ENTREGA </button>
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
  userRole: PropTypes.string.isRequired,
};
