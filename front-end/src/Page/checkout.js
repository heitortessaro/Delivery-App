import React from 'react';
import ProductList from '../Components/ProductList';
import './styles/checkout.css';

const simulateprodutos = [{
  id: 5,
  descrption: 'cerveja',
  quantity: 2,
  valueUnit: 12.0,
},
{
  id: 4,
  descrption: 'vodca',
  quantity: 1,
  valueUnit: 22.5,
}];

localStorage.setItem('checkoutProducts', JSON.stringify(simulateprodutos));

export default function Checkout() {
  const productsChecouts = JSON.parse(localStorage.getItem('checkoutProducts'));
  return (
    <div>
      { !productsChecouts
        ? null
        : (
          <div>
            <table className="table_products">
              <p className="item">item</p>
              <p className="descrp">Descricao</p>
              <p className="quant">quantidade</p>
              <p className="value">Valor Unitario</p>
              <p>subTotal</p>
              <p>Remover Item</p>
            </table>
            { productsChecouts.map((product, index) => (
              <div key={ index }>
                <ProductList produtc={ product } itemNumber={ index } />
              </div>
            )) }
          </div>
        )}
    </div>
  );
}
