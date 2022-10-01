import './styles/orderCard.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { returnDate } from '../services/ordersService';

export default function OrderCard(
  { id, orderNum, status, date, price, adress, showAdress, user },
) {
  const testId = user === 'customer' ? 'customer' : 'seller';
  const printingDate = returnDate(date);

  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="order_card"
      onClick={ () => navigate(`/${user}/orders/${id}`) }
    >
      <div className="order_number">
        <p>
          {'Pedido '}
          <br />
          <span data-testid={ `${testId}_orders__element-order-id-${id}` }>
            {orderNum}
          </span>
        </p>
      </div>
      <div className="order_main">
        <div className="order_up">
          <div className={ `order_status_${status.toLowerCase()}` }>
            <p data-testid={ `${testId}_orders__element-delivery-status-${id}` }>
              {status}
            </p>
          </div>
          <div className="order_date_price">
            <p
              data-testid={ `${testId}_orders__element-order-date-${id}` }
              className="order_date"
            >
              {printingDate}
            </p>
            <p
              data-testid={ `${testId}_orders__element-card-price-${id}` }
              className="order_price"
            >
              {price.toString().replace('.', ',')}
            </p>
          </div>
        </div>
        {showAdress && (
          <div className="order_down">
            <p data-testid={ `${testId}_orders__element-card-address-${id}` }>{adress}</p>
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
  user: PropTypes.string.isRequired,
};
