import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavClient from '../components/NavClient';
import TotalTag from '../components/TotalTag';
import SaleDetail from '../components/SaleDetails';
import ProductList from '../components/ProductList';
import './styles/customerProduct.css';

const axios = require('axios');

export default function UserSaleDetails({ userRole }) {
  const user = JSON.parse(window.localStorage.getItem('user')) || {};
  const [sale, setSale] = useState();
  const params = useParams();

  /* const getSale = async () => {
    const URL = `http://localhost:3001/sales/${params.id}`;
    const { data } = await axios.get(URL);
    console.log(data);
    setSale(data);
  }; */

  useEffect(async () => {
    const URL = `http://localhost:3001/sales/${params.id}`;
    async function fetchData() {
      const { data } = await axios.get(URL);
      console.log(data);
      setSale(data);
      return data;
    }
    fetchData();
  }, []);
  return (
    <div>
      <section>
        <NavClient selected="pedidos" customer={ user.name } showProducts />
      </section>
      <section>
        {sale && (
          <section>
            <SaleDetail userRole={ userRole } sale={ sale } />
            {sale.products.map((product, i) => (
              <ProductList
                key={ `${product.name + product.id}` }
                product={ product }
                itemNumber={ i }
                removeButton={ false }
              />
            ))}
            <div className="checkout_TotalValue">
              <p>
                Total: R$
                <spam data-testid="customer_order_details__element-order-total-price">
                  { Number(sale.totalPrice).toFixed(2).replace('.', ',') }
                </spam>
              </p>
            </div>
          </section>
        )}
      </section>
    </div>
  );
}

UserSaleDetails.propTypes = {
  userRole: PropTypes.string.isRequired,
};
