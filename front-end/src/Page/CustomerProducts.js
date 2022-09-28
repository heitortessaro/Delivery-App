import React, { useEffect, useState } from 'react';
import NavClient from '../components/NavClient';
import ProductCard from '../components/ProductCard';
import TotalTag from '../components/TotalTag';
import { getProducts, computeTotalCart } from '../services/productsServices';
import './styles/customerProduct.css';

export default function CustomerProducts() {
  const checkoutProducts = JSON
    .parse(window.localStorage.getItem('checkoutProducts')) || [];
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState((0).toFixed(2));
  const userName = JSON.parse(window.localStorage.getItem('user')).name;

  const updateQuantity = (receivedProducts) => {
    const newProducts = receivedProducts;
    checkoutProducts.forEach((p) => {
      const index = newProducts.findIndex((p2) => p2.id === p.id);
      newProducts[index].quantity = p.quantity;
    });
    setProducts(newProducts);
  };

  const receiveProducts = async () => {
    const receivedProducts = await getProducts();
    if (checkoutProducts.length > 0) {
      updateQuantity(receivedProducts);
      setTotal(computeTotalCart(checkoutProducts));
    } else {
      setProducts(receivedProducts);
    }
  };

  const changeQuantity = (id, addQtty, operation) => {
    const index = products.findIndex((p) => p.id === id);
    let newQtty;
    if (operation === 'sum') newQtty = products[index].quantity + addQtty;
    if (operation === 'change' && addQtty >= 0) newQtty = addQtty;
    if (newQtty >= 0) {
      const newProducts = products;
      newProducts[index].quantity = newQtty;
      setProducts(newProducts);
      setTotal(computeTotalCart(products));
      localStorage.setItem('checkoutProducts', JSON
        .stringify(newProducts.filter((p) => p.quantity > 0)));
      // setCheckoutProducts();
    }
  };

  useEffect(() => {
    receiveProducts();
  }, []);

  return (
    <section className="customer-products">
      <NavClient selected="produtos" customer={ userName } showProducts />
      <div className="card_shelf">
        {products.length > 0 && (
          products.map((p) => (
            <ProductCard
              key={ `${p.name + p.id}` }
              name={ p.name }
              value={ p.price }
              image={ p.urlImage }
              quantity={ p.quantity }
              id={ p.id }
              quantityHandler={ changeQuantity }
            />
          ))
        )}
      </div>
      <div className="tag_shelf"><TotalTag total={ total } /></div>
    </section>
  );
}
