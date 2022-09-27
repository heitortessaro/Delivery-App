import React, { useContext, useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import Context from '../context/Context';
import { getSalers } from '../services/SalesServices';
import NavClient from '../components/NavClient';
import './styles/checkout.css';

// const simulateprodutos = [{
//   id: 5,
//   name: 'cerveja',
//   price: 12.0,
//   quantity: 2,
// },
// {
//   id: 5,
//   name: 'cerveja',
//   quantity: 2,
//   price: 12.0,
// },
// {
//   id: 4,
//   name: 'vodca',
//   quantity: 1,
//   price: 22.5,
// }];

// localStorage.setItem('checkoutProducts', JSON.stringify(simulateprodutos));

export default function Checkout() {
  const [checkoutTotalValue, setCheckoutTotalValue] = useState();
  const { sales, setsales } = useContext(Context);
  const { checkout } = useContext(Context);
  const [inpustAdress, setInpustAdress] = useState({
    deliveryAddress: '',
    deliveryNumber: '',
    sellerId: '',
  });
  const productsCheckouts = JSON.parse(localStorage.getItem('checkoutProducts'));
  const allSales = getSalers();
  setsales(allSales);
  const order = {
    userId: '',
    sellerId: '',
    totalPrice: '',
    deliveryAddress: '',
    deliveryNumber: '',
    products: [
    ] };

  const handleInput = ({ target }) => {
    setInpustAdress({ ...inpustAdress, [target.name]: target.value });
  };

  const handleSelect = ({ target }) => {
    setInpustAdress({ ...inpustAdress, sellerId: target.value });
  };

  console.log(inpustAdress);
  const setingOrder = () => {
    order.products = [];
    productsCheckouts.map((product) => {
      order.products.push({ id: product.id, quantity: product.quantity });
      return null;
    });
    order.deliveryAddress = inpustAdress.deliveryAddress;
    order.deliveryNumber = inpustAdress.deliveryNumber;
  };

  const CalculatepriceTotal = () => {
    let total = 0;
    if (productsCheckouts) {
      productsCheckouts.map((product) => {
        total += (product.price * product.quantity);
        setCheckoutTotalValue(total);
        return null;
      });
    }
  };

  useEffect(() => {
    CalculatepriceTotal();
    setingOrder();
    console.log(order);
  }, [checkout]);

  return (
    <section className="box_section">
      <NavClient selected="produtos" customer="teste" showProducts />
      <div>
        <h3>Finalizar pedido</h3>
        <div className="box_Pedidos">
          <div className="table_products">
            <p className="item">item</p>
            <p className="descrp">Descricao</p>
            <p className="quant">quantidade</p>
            <p className="value">Valor Unitario</p>
            <p className="subTotal">subTotal</p>
            <p className="Remover">Remover Item</p>
          </div>
          { !productsCheckouts
            ? null
            : (
              <div>
                { productsCheckouts.map((product, index) => (
                  <div key={ index }>
                    <ProductList
                      produtc={ product }
                      itemNumber={ index }
                      removeButton
                    />
                  </div>
                )) }
                <div className="checkout_TotalValue">
                  <p data-testid="customer_checkout__element-order-total-price">
                    Total: R$
                    { checkoutTotalValue }
                  </p>
                </div>
              </div>)}
        </div>
      </div>
      <h3>Detalhes e enderecos para entrega</h3>
      <form className="box_Detail">
        <div className="inputs_info">
          <label htmlFor="vendedor">
            P. Vendedor Responsvel
            <select
              value={ inpustAdress.sellerId }
              data-testid="customer_checkout__select-seller"
              onChange={ handleSelect }
            >
              { !sales ? (
                sales.map((sale, index) => (
                  <option key={ index } value={ sale.id }>{sale.name}</option>
                ))
              ) : <option value={ 1 }>Carregando</option>}
            </select>
          </label>
          <label htmlFor="endereco">
            Endereco
            <input
              className="formAdress"
              type="text"
              name="deliveryAddress"
              onChange={ handleInput }
              data-testid="customer_checkout__input-address"
            />
          </label>
          <label htmlFor="number">
            Numero
            <input
              className="formNumber"
              type="text"
              name="deliveryNumber"
              onChange={ handleInput }
              data-testid="customer_checkout__input-address-number"
            />
          </label>
        </div>
        <button
          className="submitOrder"
          type="button"
          data-testid="customer_checkout__button-submit-order"
        >
          FINALIZAR PEDIDO
        </button>
      </form>
    </section>
  );
}
