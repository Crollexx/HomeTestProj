import React, { useEffect, useState } from "react";
import apiAxiosInstance from "../service/axiosInstance";

function Home({ user, cards, setCards }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const allCards = () => {
    apiAxiosInstance
      .get("/card")

      .then(({ data }) => setCards(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    allCards();
  }, []);

  return <>
  
  {cards.map((el) =>  
  <div key={el.id}>
    <div>{el.title}</div>
    <div>{el.description}</div>
    <div>{el.price}</div>
    <img src={el.image} />
    </div>
   )}
  
  
  
  </>;
}

export default Home;
