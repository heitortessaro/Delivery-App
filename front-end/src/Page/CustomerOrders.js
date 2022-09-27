import React, { useEffect, useState } from 'react';
import NavClient from '../components/NavClient';
import OrderCard from '../components/OrderCard';
import { getOrders } from '../services/ordersService';
import './styles/customerOrders.css';

export default function CustomerOrders() {
  const user = JSON.parse(window.localStorage.getItem('user')) || {};
  const [orders, setOrders] = useState([]);

  const ordersTest = [{
    id: 1,
    orderNum: '003',
    status: 'Pendente',
    date: '26/79/95',
    price: '23,80',
    adress: 'rua asdakldj',
  }];

  const receiveOrders = async () => {
    const receivedOrders = await getOrders(user);
    setOrders(receivedOrders);
  };

  useEffect(() => {
    receiveOrders();
  }, []);

  console.log(orders);

  return (
    <section className="customer_orders">
      <NavClient selected="pedidos" customer={ user.name } showProducts />
      {ordersTest.length > 0 && ordersTest.map((o) => (
        <OrderCard
          key={ `${o.id + o.orderNum + o.date}` }
          id={ o.id }
          orderNum={ o.orderNum }
          status={ o.status }
          date={ o.date }
          price={ o.price }
          adress={ o.adress }
          showAdress
        />
      ))}
    </section>
  );
}
