import React from 'react';
import './styles/productCard.css';

export default function ProductCard({ name, value, image, quantity }) {
  return (
    <div className="product_card">
      <div className="product_price">
        <span>{`R$ ${value}`}</span>
      </div>
      <figure className="product_image_container">
        <img className="product_image" src={ image } alt={ `produto ${name}` } />
      </figure>
      <div className="product_card_footer">
        <p className="product_name">{name}</p>
        <div>
          <button
            type="button"
            className="product-btn-left"
          >
            -
          </button>
          <div className="product_quantity">
            <span>{quantity}</span>
          </div>
          <button
            type="button"
            className="product-btn-rigth "
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
