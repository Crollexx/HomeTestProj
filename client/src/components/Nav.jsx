import React from "react";
import { NavLink } from "react-router-dom";

function Nav({ user }) {
  return (
    <nav>
      <NavLink to="/">Главная страница </NavLink>

      {user ? (
        <>
         <NavLink to="/personalAccount">Личный кабинет</NavLink>
         <NavLink to="/favorite">Избранное</NavLink>
         <NavLink to="/logout">Выйти</NavLink>
         <span>{user.name}</span>
        </>
      ) : (
        <>
          <NavLink to="/registration"> Регистрация </NavLink>
          <NavLink to="/authorization"> Авторизация</NavLink>
        </>
      )}
    </nav>
  );
}

export default Nav;
