import React, { useState } from "react";
import apiAxiosInstance from "../service/axiosInstance";

function Registration() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [role, setRole] = useState(false);

  const userRegistration = (event) => {
    event.preventDefault()

    if(password === confirm){
        apiAxiosInstance.post('/registration', {name, email, password, role})
        .then 
    }
  }

   

  return (
    <>
      <form>
        <input type="text"  placeholder="Введите имя" />
        <input type="email" placeholder="Введите email" />
        <input type="password" placeholder="Введите пароль" />
        <input type="password" placeholder="Повторите пароль" />
        <select>
          <option > ggg</option>
          <option > пывапвыап</option>
        </select>
        <button> Зарегистрироваться</button>
      </form>
    </>
  );
}

export default Registration;
