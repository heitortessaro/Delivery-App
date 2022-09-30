import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as EmailValidator from 'email-validator';
import { createUser } from '../services/loginServices';

export default function Register() {
  const minpass = 5;
  const minName = 12;
  const errovalidation = 409;
  const [btnIsdisable, setBttnIsDisabled] = useState(true);
  const [menssageError, setMessageerror] = useState('');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });
  const { name, email, password, role } = formState;
  const navigate = useNavigate();

  const handleInput = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

  useEffect(() => {
    const verifyButton = () => {
      const validateEmail = EmailValidator.validate(email);
      const InvalidatePassword = (password.length <= minpass && password !== 0);
      const InvalidName = (name.length < minName && name.length !== 0);

      if (InvalidatePassword) setBttnIsDisabled(true);
      if (validateEmail && !InvalidatePassword && !InvalidName) {
        setBttnIsDisabled(false);
        setMessageerror('');
      } if (InvalidName) {
        setMessageerror('usuario deve ter minino 12 caracteres');
        setBttnIsDisabled(true);
      } else {
        setMessageerror('');
      }
      if (!validateEmail && email.length !== 0) {
        setMessageerror('insira um email valido');
        setBttnIsDisabled(true);
      }
    };
    verifyButton();
  }, [email, password, name]);

  const handleButtonLogin = async () => {
    const { newUser, error } = await createUser({ name, email, password, role });
    if (error && error.status === errovalidation) {
      setMessageerror('Usuario ja cadastrado');
      return null;
    }
    if (!newUser && !error) {
      setMessageerror('falha na comunicacao');
      return null;
    }
    localStorage.setItem('checkoutProducts', JSON.stringify([]));
    localStorage.setItem('user', JSON.stringify(newUser));
    if (newUser.role === 'customer') navigate('/customer/products');
  };

  return (
    <section className="box_principal">
      <h1>Cadastro</h1>
      <form className="forms_login">
        <label htmlFor="name-input" className="label_login">
          Nome
          <input
            id="name-input"
            type="text"
            name="name"
            data-testid="common_register__input-name"
            value={ name }
            onChange={ handleInput }
          />
        </label>
        <label htmlFor="email-input" className="label_login">
          Login
          <input
            id="email-input"
            type="text"
            name="email"
            data-testid="common_register__input-email"
            value={ email }
            onChange={ handleInput }
          />
        </label>
        <label htmlFor="password-input" className="label_login">
          Senha
          <input
            id="password-input"
            type="password"
            name="password"
            data-testid="common_register__input-password"
            value={ password }
            onChange={ handleInput }
          />
        </label>
        <button
          className="button_login"
          type="button"
          data-testid="common_register__button-register"
          disabled={ btnIsdisable }
          onClick={ handleButtonLogin }
        >
          Registar
        </button>
      </form>
      <p data-testid="common_register__element-invalid_register">
        { menssageError }
      </p>

    </section>
  );
}
