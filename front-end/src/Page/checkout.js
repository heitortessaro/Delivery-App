import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/ProductList';
import Context from '../context/Context';
import NavClient from '../components/NavClient';
import { postSale } from '../services/salesServices';
import './styles/checkout.css';

export default function Checkout() {
  const navigate = useNavigate();
  const { checkoutTotalValue, setCheckoutTotalValue } = useContext(Context);
  const { allSalser } = useContext(Context);
  const { checkout } = useContext(Context);
  const [inpustAdress, setInpustAdress] = useState({
    deliveryAddress: '',
    deliveryNumber: '',
    sellerId: '',
  });
  const productsCheckouts = JSON.parse(localStorage.getItem('checkoutProducts'));
  const order = {
    userId: '',
    sellerId: '',
    totalPrice: 0,
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
    order.sellerId = inpustAdress.sellerId;
  };

  const CalculatepriceTotal = () => {
    let total = 0;
    if (productsCheckouts) {
      productsCheckouts.map((product) => {
        total += (Number(product.price) * Number(product.quantity));
        setCheckoutTotalValue(total);
        order.totalPrice = total;
        return null;
      });
    }
  };

  useEffect(() => {
    CalculatepriceTotal();
    setingOrder();
    console.log(order);
  }, [checkout]);

  const submitButton = async () => {
    CalculatepriceTotal();
    setingOrder();
    console.log(order);
    const idRetunr = await postSale(order);
    if (idRetunr) {
      navigate(`/customer/sales:${idRetunr}`);
    } else {
      console.log(erro);
      return null;
    }
  };

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
              <div className="box_total">
                <div className="checkoutProducts">
                  { productsCheckouts.map((product, index) => (
                    <div key={ index }>
                      <ProductList
                        produtc={ product }
                        itemNumber={ index }
                        removeButton
                      />
                    </div>
                  )) }
                </div>
                <div className="checkout_TotalValue">
                  <p data-testid="customer_checkout__element-order-total-price">
                    Total: R$
                    { checkoutTotalValue.toFixed(2).replace('.', ',') }
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
              { !allSalser ? (
                allSalser.map((sale, index) => (
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
          onClick={ submitButton }
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
