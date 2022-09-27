import './styles/productCard.css';
import PropTypes from 'prop-types';

export default function ProductCard(
  { id, orderNum, status, date, price, adress, showAdress },
) {
  return (
    <div className="product_card">
      <div className="order_number">
        <p>
          Pedido
          <span data-testid={ `seller_orders__element-order-${id}` }>{orderNum}</span>
        </p>
      </div>
      <div className="order_main">
        <div className="order_up">
          <div
            className="order_status"
            data-testid={ `seller_orders__element-delivery-status-${id}` }
          >
            {status}
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
    </div>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  orderNum: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  adress: PropTypes.string.isRequired,
  showAdress: PropTypes.bool.isRequired,
};
