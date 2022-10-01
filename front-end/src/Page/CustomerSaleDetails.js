import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavClient from '../components/NavClient';
import SaleDetail from '../components/SaleDetails';
import ProductList from '../components/ProductList';
import './styles/customerProduct.css';

const axios = require('axios');

export default function CustomerSaleDetails({ userRole }) {
  const user = JSON.parse(window.localStorage.getItem('user')) || {};
  const [sale, setSale] = useState(false);
  const [products, setProducts] = useState(false);
  const params = useParams();

  useEffect(() => {
    console.log(params.id);
    const URL = `http://localhost:3001/sales/${params.id}`;
    async function fetchData() {
      const { data } = await axios.get(URL);
      console.log(data.products);
      if (data.products.length) {
        setProducts(data.products);
      }
      setSale(data);
    }
    if (!sale || !products) { fetchData(); }
  }, [sale, products, params.id]);
  return (
    <div>
      <section>
        <NavClient selected="pedidos" customer={ user.name } showProducts />
      </section>
      <section>
        {sale && products && (
          <section>
            <SaleDetail userRole={ userRole } sale={ sale } />
            {products.map((product, i) => (
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

CustomerSaleDetails.propTypes = {
  userRole: PropTypes.string.isRequired,
};
