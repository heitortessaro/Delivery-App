import React from 'react';
import PropTypes from 'prop-types';
import './Styles/ProductList.css';

export default function ProductList({ produtc, itemNumber }) {
  return (
    <div className="box_pd_info">
      <div className="pd_id">
        <p>{ itemNumber + 1 }</p>
      </div>
      <div className="pd_desc">
        <p>{ produtc.descrption }</p>
      </div>
      <div className="pd_quant">
        <p>{ produtc.quantity }</p>
      </div>
      <div className="pd_value">
        <p>
          R$
          { produtc.valueUnit }
        </p>
      </div>
      <div className="pd_subTotal">
        <p>
          R$
          { produtc.valueUnit * produtc.quantity }
        </p>
      </div>
      <div className="pd_button">
        <p><button type="button">Remover</button></p>
      </div>
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
};
