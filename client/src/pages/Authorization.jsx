import React, { useState } from "react";
import apiAxiosInstance, { setAccessToken } from "../service/axiosInstance";
import { useNavigate } from "react-router-dom";

function Authorization({setUser}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const userAuth = (event) => {
    event.preventDefault();

    apiAxiosInstance
      .post("/authorization", { email, password })
      
      .then(( {data} ) => {
        
        setAccessToken(data.accessToken)
        setUser(data.user)
        navigate("/")
      })
      .catch((error) => {
        
        console.log(error)
        
        setError(error.data.message)
      });
  };

  return (
    <>
      <form onSubmit={userAuth}>
        <input
          type="email"
          onChange={({ target }) => setEmail(target.value)}
          placeholder="Введите email"
        />
        <input
          type="password"
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Введите пароль"
        />
        <button type="submit">Войти</button>
      </form>
    </>
  );
}

export default Authorization;
