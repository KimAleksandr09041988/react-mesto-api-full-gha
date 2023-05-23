import React from 'react';
import logo from '../image/Vector.svg';
import { Routes, Route, Link } from 'react-router-dom';


export default function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип" />
      <div className="header__wrapper">
        {email && <p className="header__user-email">{email}</p>}
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Link className="header__link" to="/sign-in">
                Войти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link className="header__link" to="/sign-up">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <Link className="header__link" onClick={onSignOut} to="/sign-in">
                Выйти
              </Link>
            }
          />
        </Routes>
      </div>
    </header >
  )
}
