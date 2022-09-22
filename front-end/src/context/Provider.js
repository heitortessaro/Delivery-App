import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const INITIAL_STATE = { };
  const state = useMemo(() => ({ ...INITIAL_STATE }), []);

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
