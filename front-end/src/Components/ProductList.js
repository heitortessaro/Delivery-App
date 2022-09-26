import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './Styles/ProductList.css';
import Context from '../context/Context';

export default function ProductList({ produtc, itemNumber, removeButton }) {
  const subTotal = produtc.valueUnit * produtc.quantity;
  const { setCheckout } = useContext(Context);
  const productsCheckouts = JSON.parse(localStorage.getItem('checkoutProducts'));

  const RemoveProduct = () => {
    console.log('executei');
    const remove = productsCheckouts.find((produto) => produto.id === produtc.id);
    localStorage.setItem(
      'checkoutProducts',
      JSON.stringify(productsCheckouts.filter((product) => product !== remove)),
    );
    const updateStorage = productsCheckouts.find((produto) => produto.id === produtc.id);
    setCheckout(updateStorage);
    console.log(updateStorage);
  };
  return (
    <div className="box_pd_info">
      <div className="pd_id">
        <p
          data-testeid={
            `customer_checkout__element-order-table-item-number-${itemNumber}`
          }
        >
          { itemNumber + 1 }
        </p>
      </div>
      <div className="pd_desc">
        <p
          data-testid={
            `customer_checkout__element-order-table-name-${itemNumber}`
          }
        >
          { produtc.descrption }

        </p>
      </div>
      <div className="pd_quant">
        <p
          data-testid={
            `customer_checkout__element-order-table-quantity-${itemNumber}`
          }
        >
          { produtc.quantity }

        </p>
      </div>
      <div className="pd_value">
        <p
          data-testid={
            `customer_checkout__element-order-table-unit-price-${itemNumber}`
          }
        >
          R$
          { produtc.valueUnit }
        </p>
      </div>
      <div className="pd_subTotal">
        <p
          data-testid={
            `customer_checkout__element-order-table-sub-total-${itemNumber}`
          }
        >
          R$
          { subTotal }
        </p>
      </div>
      { removeButton
        ? (
          <div className="pd_button">
            <p>
              <button
                data-testid={
                  `customer_checkout__element-order-table-remove-${itemNumber}`
                }
                type="button"
                onClick={ RemoveProduct }
              >
                Remover
              </button>
            </p>
          </div>)
        : null}
    </div>
  );
}

ProductList.propTypes = {
  produtc: PropTypes.shape({
    id: PropTypes.number,
    descrption: PropTypes.string,
    valueUnit: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  itemNumber: PropTypes.number.isRequired,
  removeButton: PropTypes.bool.isRequired,
};
