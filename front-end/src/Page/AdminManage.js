import React, { useState, useEffect } from 'react';
import * as EmailValidator from 'email-validator';
import NavClient from '../components/NavClient';
import { createUser } from '../services/loginServices';
import './styles/adminManage.css';

export default function AdminManage() {
  const minpass = 5;
  const minName = 12;
  const errovalidation = 409;
  const [btnIsdisable, setBttnIsDisabled] = useState(true);
  const [menssageError, setMessageerror] = useState('');
  const [formCadUser, setFormCaduser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'seller',
  });
  const { name, email, password } = formCadUser;
  const userStorage = JSON.parse(localStorage.getItem('user'));

  const handleInput = ({ target }) => {
    setFormCaduser({ ...formCadUser, [target.name]: target.value });
  };

  console.log(formCadUser);
  const handleSelect = ({ target }) => {
    setFormCaduser({ ...formCadUser, role: target.value });
  };

  const admCreateUser = async () => {
    const { newUser, error } = await createUser(formCadUser, userStorage.token);
    if (error && error.status === errovalidation) {
      setMessageerror('Usuario ja cadastrado');
      return null;
    }
    if (!newUser && !error) {
      setMessageerror('falha na comunicacao');
      return null;
    }
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

  return (
    <section className="box_admSection">
      <NavClient manage customer={ userStorage.name } />
      <h2>Cadastrar Novo Usuario</h2>
      <p data-testid="admin_manage__element-invalid-register">{ menssageError }</p>
      <form className="form_cadUser">
        <label htmlFor="name">
          Nome
          <input
            className="inputName"
            type="text"
            name="name"
            value={ name }
            onChange={ handleInput }
            data-testid="admin_manage__input-name"
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            className="inputemail"
            type="text"
            name="email"
            value={ email }
            onChange={ handleInput }
            data-testid="admin_manage__input-email"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            className="inputPassword"
            type="password"
            name="password"
            value={ password }
            onChange={ handleInput }
            data-testid="admin_manage__input-password"
          />
        </label>
        <label htmlFor="tipo">
          Tipo
          <select
            name="role"
            defaultValue="Seller"
            data-testid="admin_manage__select-role"
            onClick={ handleSelect }
          >
            <option value="seller">Vendedor</option>
            <option value="custumer">Cliente</option>
            <option value="administrator">Administrador</option>
          </select>
        </label>
        <button
          onClick={ admCreateUser }
          className="submitOrder"
          type="button"
          disabled={ btnIsdisable }
          data-testid="admin_manage__button-register"
        >
          Cadastrar
        </button>
      </form>
    </section>
  );
}
