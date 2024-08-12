import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <NavLink to="/">Главная страница </NavLink>
      <NavLink to="/registration"> Регистрация </NavLink>
      <NavLink to="/authorization"> Авторизация</NavLink>
      <NavLink to="logout">Выйти</NavLink>

    </nav>
  );
}

export default Nav;
