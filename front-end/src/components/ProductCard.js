import React from 'react';
import './styles/productCard.css';
import PropTypes from 'prop-types';

export default function ProductCard(
  { name, value, image, quantity, id, quantityHandler },
) {
  const plusOne = 1;
  const minusOne = -1;
  return (
    <div className="product_card">
      <div className="product_price">
        <p>
          R$
          <span data-testid={ `customer_products__element-card-price-${id}` }>
            {value.toString().replace('.', ',')}
          </span>
        </p>
      </div>
      <figure className="product_image_container">
        <img
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          className="product_image"
          src={ image }
          alt={ `produto ${name}` }
        />
      </figure>
      <div className="product_card_footer">
        <p
          className="product_name"
          data-testid={ `customer_products__element-card-title-${id}` }
        >
          {name}
        </p>
        <div>
          <button
            type="button"
            className="product-btn-left"
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            onClick={ () => quantityHandler(id, minusOne) }
          >
            -
          </button>
          <div className="product_quantity">
            <span data-testid={ `customer_products__input-card-quantity-${id}` }>
              {quantity}
            </span>
          </div>
          <button
            type="button"
            className="product-btn-rigth "
            data-testid={ `customer_products__button-card-add-item-${id}` }
            onClick={ () => quantityHandler(id, plusOne) }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  quantityHandler: PropTypes.func.isRequired,
};
