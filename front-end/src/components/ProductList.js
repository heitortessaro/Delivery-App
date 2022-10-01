import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './styles/ProductList.css';
import Context from '../context/Context';

export default function ProductList({ product, itemNumber, removeButton }) {
  let quantity = 0;
  if (product.sales_products) {
    quantity = product.sales_products.quantity;
  } else {
    quantity = product.quantity;
  }
  const subTotal = Number(product.price) * Number(quantity);
  console.log(subTotal);
  const { setCheckout } = useContext(Context);
  const productsCheckouts = JSON.parse(localStorage.getItem('checkoutProducts'));

  const RemoveProduct = () => {
    // const remove = productsCheckouts.find((produto) => produto.id === product.id);
    const temp = productsCheckouts.filter((p) => p.id !== product.id);
    localStorage.setItem('checkoutProducts', JSON.stringify(temp));
    setCheckout(temp);
  };
  return (
    <div className="box_pd_info">
      <div className="pd_id">
        <p
          data-testid={
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
          { product.name }

        </p>
      </div>
      <div className="pd_quant">
        <p
          data-testid={
            `customer_checkout__element-order-table-quantity-${itemNumber}`
          }
        >
          { product.quantity ? product.quantity : product.sales_products.quantity}
        </p>
      </div>
      <div className="pd_value">
        <p
          data-testid={
            `customer_checkout__element-order-table-unit-price-${itemNumber}`
          }
        >
          { product.price.replace('.', ',') }
        </p>
      </div>
      <div className="pd_subTotal">
        <p
          data-testid={
            `customer_checkout__element-order-table-sub-total-${itemNumber}`
          }
        >
          { subTotal.toFixed(2).replace('.', ',') }
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
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    sales_products: PropTypes.shape({
      quantity: PropTypes.number,
    }),
    quantity: PropTypes.number,
  }).isRequired,
  itemNumber: PropTypes.number.isRequired,
  removeButton: PropTypes.bool.isRequired,
};
