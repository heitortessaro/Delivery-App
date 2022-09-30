import './styles/orderCard.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function OrderCard(
  { id, orderNum, status, date, price, adress, showAdress },
) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="order_card"
      onClick={ () => navigate(`/customer/orders/${id}`) }
    >
      <div className="order_number">
        <p>
          {'Pedido '}
          <br />
          <span data-testid={ `seller_orders__element-order-${id}` }>{orderNum}</span>
        </p>
      </div>
      <div className="order_main">
        <div className="order_up">
          <div className={ `order_status_${status.toLowerCase()}` }>
            <p data-testid={ `seller_orders__element-delivery-status-${id}` }>{status}</p>
          </div>
          <div className="order_date_price">
            <p
              data-testid={ `seller_orders__element-order-date-${id}` }
              className="order_date"
            >
              {date}
            </p>
            <p
              data-testid={ `seller_orders__element-card-price-${id}` }
              className="order_price"
            >
              {price}
            </p>
          </div>
        </div>
        {showAdress && (
          <div className="order_down">
            <p data-testid={ `seller_orders__element-card-address-${id}` }>{adress}</p>
          </div>)}
      </div>
    </button>
  );
}

OrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  orderNum: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  adress: PropTypes.string.isRequired,
  showAdress: PropTypes.bool.isRequired,
};
