import React from "react";
import apiAxiosInstance, { setAccessToken } from "../service/axiosInstance";
import { useNavigate } from "react-router-dom";


function LogOut({user, setUser}) {
  const navigate = useNavigate();

  const logOutUser = () => {
    apiAxiosInstance
      .delete("/logout")
      .then(({ data }) => {
        setAccessToken(data.accessToken);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return <>
  
  <button onClick={logOutUser}> Выйти</button>
  
  </>;
}

export default LogOut;
