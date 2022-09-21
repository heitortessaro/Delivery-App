import React, { useState, useEffect } from 'react';
import * as EmailValidator from 'email-validator';
import { Redirect } from 'react-router-dom';
import Logo from '../images/logo.jpg';
import { login } from '../services/loginServices';

const minpass = 6;
const errovalidation = 404;

function Login() {
  const [btnIsdisable, setBttnIsDisabled] = useState(true);
  const [failEmail, setfailemail] = useState(false);
  const [invalidUser, setinValidUser] = useState(false);
  const [failconection, setfailconection] = useState(false);
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formState;

  const handleInput = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

  useEffect(() => {
    const verifyButton = () => {
      const validateEmail = EmailValidator.validate(email);
      const validatePassword = password.length > minpass;
      if (validateEmail && validatePassword) {
        setBttnIsDisabled(false);
        setfailemail(false);
      } else if (email.length === 0) {
        setfailemail(false);
        setBttnIsDisabled(false);
      } else {
        setfailemail(true);
        setBttnIsDisabled(true);
      }
    };
    verifyButton();
  }, [email, password]);

  const handleButtonLogin = async () => {
    const result = await login({ email, password });
    if (!result) {
      setfailconection(true);
    }
    if (result.status === errovalidation) {
      setinValidUser(false);
    }
    localStorage.setItem(keyLocalStorage, JSON.stringify(result));

    if (result.role === 'customer') Redirect('/customer/products');
    if (result.role === 'administrator') Redirect('/admin/manage');
    if (result.role === 'seller') Redirect('/seller/orders');
  };

  return (
    <section>
      <div>
        <div>
          <img src={ Logo } alt="logo" />
          <h2>app de delivery</h2>
        </div>
        <form>
          <label htmlFor="email-input">
            Login
            <input
              id="email-input"
              type="text"
              name="email"
              data-testid="common_login__input-email"
              value={ email }
              onChange={ handleInput }
            />
          </label>
          <label htmlFor="password-input">
            Senha
            <input
              id="password-input"
              type="password"
              name="password"
              data-testid="common_login__input-password"
              value={ password }
              onChange={ handleInput }
            />
          </label>
          <button
            type="button"
            data-testid="common_login__button-login"
            disabled={ btnIsdisable }
            onClick={ handleButtonLogin }
          >
            LOGIN
          </button>
          <button
            type="button"
            data-testid="common_login__button-register"
            onClick={ () => Redirect('/register') }
          >
            Ainda nao tenho Conta
          </button>
        </form>
      </div>
      {
        failEmail
          ? (
            <div>
              <p data-testid="common_login__element-invalid-email">
                insira um email valido
              </p>
            </div>
          )
          : null
      }
      {
        invalidUser
          ? (
            <div>
              <p dtata-testid="common_login__element-invalid-email">
                Usuario ou senha invalido
              </p>
            </div>
          )
          : null
      }
      {
        failconection ? (
          <div>
            <p> falha na comunicacao</p>
          </div>
        ) : null
      }
    </section>
  );
}

export default Login;
