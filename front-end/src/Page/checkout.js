import React, { useContext, useEffect } from 'react';
import ProductList from '../Components/ProductList';
import Context from '../context/Context';
import getSales from '../services/SalesServices';
import './styles/checkout.css';

// const simulateprodutos = [{
//   id: 5,
//   descrption: 'cerveja',
//   valueUnit: 12.0,
//   quantity: 2,
// },
// {
//   id: 5,
//   descrption: 'cerveja',
//   quantity: 2,
//   valueUnit: 12.0,
// },
// {
//   id: 4,
//   descrption: 'vodca',
//   quantity: 1,
//   valueUnit: 22.5,
// }];

// localStorage.setItem('checkoutProducts', JSON.stringify(simulateprodutos));

export default function Checkout() {
  const { checkoutTotalValue, setCheckoutTotalValue } = useContext(Context);
  const { sales, setsales } = useContext(Context);
  const { checkout, setCheckout } = useContext(Context);
  const productsCheckouts = JSON.parse(localStorage.getItem('checkoutProducts'));

  useEffect(() => {
    let total = 0;
    productsCheckouts.map((product) => {
      const subTotal = product.valueUnit * product.quantity;
      total += subTotal;
      return total;
    });
    const allSales = getSales();
    setsales(allSales);
    setCheckoutTotalValue(total);
  }, [checkout, sales]);

  return (
    <section className="box_section">
      { !productsCheckouts
        ? null
        : (
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
            </div>
          </div>
        )}
      <h3>Detalhes e enderecos para entrega</h3>
      <form className="box_Detail">
        <div className="inputs_info">
          <label htmlFor="vendedor">
            P. Vendedor Responsvel
            <select data-testid="customer_checkout__select-seller">
              { !sales ? (
                sales.map((sale, index) => (
                  <option key={ index }>{sale.name}</option>
                ))
              ) : <option k>Carregando</option> }
            </select>
          </label>
          <label htmlFor="endereco">
            Endereco
            <input
              className="formAdress"
              type="text"
              name="endereco"
              data-testid="customer_checkout__input-address"
            />
          </label>
          <label htmlFor="number">
            Numero
            <input
              className="formNumber"
              type="number"
              name="number"
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
