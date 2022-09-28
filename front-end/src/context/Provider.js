import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
// import { getSalers } from '../services/SalerServices';

function Provider({ children }) {
  const [checkoutTotalValue, setCheckoutTotalValue] = useState(0);
  const [sales, setsales] = useState([]);
  const [checkout, setCheckout] = useState();
  const [allSellers, setAllSellers] = useState();

  const state = useMemo(() => ({
    checkoutTotalValue,
    setCheckoutTotalValue,
    checkout,
    setCheckout,
    sales,
    setsales,
    allSellers,
    setAllSellers,
  }), [checkoutTotalValue, checkout]);
  return (
    <div>
      <Context.Provider value={ state }>
        { children }
      </Context.Provider>
    </div>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
