import React, { useState } from "react";
import apiAxiosInstance, { setAccessToken } from "../service/axiosInstance";
import { useNavigate } from "react-router-dom";

function Registration({setUser}) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [role, setRole] = useState(true);
  const navigate = useNavigate();

  const userRegistration = (event) => {
    event.preventDefault();

    if (confirm === password) {
      apiAxiosInstance
        .post("/registration", { name, email, password, role })
        .then(({ data }) => {   
          setAccessToken(data.accessToken);
          setUser(data.user)
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <form onSubmit={userRegistration}>
        <input type="text"
          onChange={({ target }) => setName(target.value)} placeholder="Введите имя"/>
        <input
          type="email" onChange={({ target }) => setEmail(target.value)} placeholder="Введите email"/>
        <input
          type="password" onChange={({ target }) => setPassword(target.value)} placeholder="Введите пароль"/>
        <input
          type="password" onChange={({ target }) => setConfirm(target.value)} placeholder="Повторите пароль"/>
        <select onChange={({target}) => setRole(target.value)}>
          <option value={true}>Продавец</option>
          <option value={false}>Покупатель</option>
        </select>
        <button> Зарегистрироваться</button>
      </form>
    </>
  );
}

export default Registration;
