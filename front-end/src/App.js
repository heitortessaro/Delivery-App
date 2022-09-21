import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Page/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route exact to="/login" component={ Login } />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
