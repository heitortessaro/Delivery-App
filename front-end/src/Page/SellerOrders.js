import React, { useEffect, useState } from 'react';
import NavClient from '../components/NavClient';
import OrderCard from '../components/OrderCard';
import { getOrders } from '../services/ordersService';
import './styles/customerOrders.css';

export default function SellerOrders() {
  const user = JSON.parse(window.localStorage.getItem('user')) || {};
  const [orders, setOrders] = useState([]);

  const receiveOrders = async () => {
    const receivedOrders = await getOrders(user);
    setOrders(receivedOrders);
  };

  useEffect(() => {
    receiveOrders();
  }, []);

  return (
    <section className="customer_orders">
      <NavClient selected="pedidos" customer={ user.name } showProducts={ false } />
      <div className="card_shelf">
        {orders.length > 0 && orders.map((o) => (
          <OrderCard
            key={ `${o.id + o.deliveryNumber + o.saleDate}` }
            id={ o.id }
            orderNum={ o.deliveryNumber }
            status={ o.status }
            date={ o.saleDate }
            price={ o.totalPrice }
            adress={ o.deliveryAddress }
            showAdress={ false }
            user="seller"
          />
        ))}
      </div>
    </section>
  );
}
