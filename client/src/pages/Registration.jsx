import React, { useState } from "react";
import apiAxiosInstance, { setAccessToken } from "../service/axiosInstance";

function Registration({ setUser }) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [role, setRole] = useState(true);

  const userRegistration = (event) => {
    event.preventDefault();

    if (confirm === password) {
      apiAxiosInstance
        .post("/registration", { name, email, password, role })
        .then(({ data }) => {
          setAccessToken(data.accessToken);
          setUser(data.user);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <>
      <form onSubmit={userRegistration}>
        <input type="text" onChange={({target}) => setName(target.value)} placeholder="Введите имя" />
        <input type="email" onChange={({target}) => setEmail(target.value)} placeholder="Введите email" />
        <input type="password" onChange={({target}) => setPassword(target.value)} placeholder="Введите пароль" />
        <input type="password" onChange={({target}) => setConfirm(target.value)} placeholder="Повторите пароль" />
        <select>
          <option onChange={({target}) => setRole(target.value)}> false </option>
          <option> пывапвыап</option>
        </select>
        <button> Зарегистрироваться</button>
      </form>
    </>
  );
}

export default Registration;
