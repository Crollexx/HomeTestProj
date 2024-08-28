import React, { useEffect, useState } from "react";
import apiAxiosInstance from "../service/axiosInstance";


function Home() {
const [card, setCard] = useState([])
  
  const loadCards = async () => {
    
      const { data } = await apiAxiosInstance.get('/card');
      console.log(data);
        setCard(data);
    
  }
  
   useEffect(() => {
    loadCards();
  }, []);
 

  return (
    <>
   {card.map((item) => (
        <div key={item.id}>
          <div>{item.title}</div>
          <div>{item.description}</div>
          <div>{item.price}</div>
          <img src={item.image} />
        </div>
      ))}
    </>
  );
}

export default Home;
