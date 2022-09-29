import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/ProductList';
import Context from '../context/Context';
import NavClient from '../components/NavClient';
import { postSale } from '../services/salesServices';
import { getSalers } from '../services/SalerServices';
import './styles/checkout.css';
import { computeTotalCart } from '../services/productsServices';

export default function Checkout() {
  const navigate = useNavigate();
  const { checkoutTotalValue, setCheckoutTotalValue } = useContext(Context);
  const productsCheckouts = JSON.parse(localStorage.getItem('checkoutProducts'));
  const userStorage = JSON.parse(localStorage.getItem('user'));
  const order = {
    userId: 0,
    sellerId: 0,
    totalPrice: 0,
    deliveryAddress: '',
    deliveryNumber: '',
    products: [
    ] };
  const [allSellers, setAllSellers] = useState([]);
  const { checkout } = useContext(Context);
  const [inpustAdress, setInpustAdress] = useState({
    deliveryAddress: '',
    deliveryNumber: '',
    sellerId: '',
  });

  const getAllSellers = async () => {
    const result = await getSalers();
    // console.log(result[0].id);
    setAllSellers(result);
    setInpustAdress({ ...inpustAdress, sellerId: result[0].id });
  };

  const handleInput = ({ target }) => {
    setInpustAdress({ ...inpustAdress, [target.name]: target.value });
  };

  const handleSelect = ({ target }) => {
    console.log(target.value);
    setInpustAdress({ ...inpustAdress, sellerId: target.value });
  };

  const setingOrder = () => {
    order.products = [];
    productsCheckouts.map((product) => {
      order.products.push({ id: product.id, quantity: product.quantity });
      return null;
    });
    order.deliveryAddress = inpustAdress.deliveryAddress;
    order.deliveryNumber = inpustAdress.deliveryNumber;
    order.sellerId = Number(inpustAdress.sellerId);
    order.userId = userStorage.id;
  };

  // const CalculatepriceTotal = () => {
  //   let total = 0;
  //   if (productsCheckouts) {
  //     productsCheckouts.map((product) => {
  //       total += (Number(product.price) * Number(product.quantity));
  //       setCheckoutTotalValue(total);
  //       order.totalPrice = total.toFixed(2);
  //       return null;
  //     });
  //   }
  // };

  useEffect(() => {
    const total = computeTotalCart(productsCheckouts);
    setCheckoutTotalValue(Number(total));
    order.totalPrice = Number(total).toFixed(2);
    // CalculatepriceTotal();
    setingOrder();
  }, [checkout]);

  useEffect(() => {
    getAllSellers();
  }, []);

  const submitButton = async () => {
    // CalculatepriceTotal();
    const total = computeTotalCart(productsCheckouts);
    setCheckoutTotalValue(total);
    order.totalPrice = Number(total).toFixed(2);
    setingOrder();
    // console.log(order);
    console.log(setInpustAdress);
    const idRetunr = await postSale(order, userStorage);
    // console.log(`Primeiro retorn ${idRetunr}`);
    // if (idRetunr) {
    // console.log(idRetunr);
    navigate(`/customer/orders/${idRetunr}`);
    // } else {
    // console.log(erro);
    // return null;
    // }
  };
  return (
    <section className="box_section">
      <NavClient selected="produtos" customer={ userStorage.name } showProducts />
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
                        product={ product }
                        itemNumber={ index }
                        removeButton
                      />
                    </div>
                  )) }
                </div>
                <div className="checkout_TotalValue">
                  <p>
                    Total: R$
                    <spam data-testid="customer_checkout__element-order-total-price">
                      { Number(checkoutTotalValue).toFixed(2).replace('.', ',') }
                    </spam>
                  </p>
                </div>
              </div>)}
        </div>
      </div>
      <h3>Detalhes e enderecos para entrega</h3>
      {allSellers.length > 0 && (
        <form className="box_Detail">
          <div className="inputs_info">
            <label htmlFor="vendedor">
              P. Vendedor Responsvel
              <select
                // value={ inpustAdress.sellerId }
                defaultValue={ allSellers[0].id }
                data-testid="customer_checkout__select-seller"
                onChange={ handleSelect }
              >
                {allSellers.map((sale, index) => (
                  <option key={ index } value={ sale.id }>
                    {sale.name}
                  </option>
                ))}
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
      )}
      ;
    </section>
  );
}
