import { useParams } from "react-router-dom";
import apiAxiosInstance from "../service/axiosInstance";
import { useEffect, useState } from "react";
import './styles.css';

function PersonalAccount({ user, setUser, cards, setCards }) {
  const [category, setCategory] = useState([]);

  const [form, setForm] = useState({
    title: null,
    description: null,
    price: null,
    image: null,
    category_id: 1,
    user_id: null,
  });

  const { id } = useParams();

  const loadUserCards = async () => {
    if (user?.id) {
      const { data } = await apiAxiosInstance.get(`/card/user/${user.id}`);

      setCards(data);
    }
  };

  const loadCategory = async () => {
    const { data } = await apiAxiosInstance.get("/category");

    setCategory(data);
  };
  const createCard = async (e) => {
    e.preventDefault();

    const { data } = await apiAxiosInstance.post("/card", {
      ...form,
      user_id: user.id, category_name: name
    });
    console.log(data);
    
    if (data.message === "success") {
      setCards((prev) => [...prev, data.card]);
    }
  };

  const deleteCard = async (id) => {
    const { data } = await apiAxiosInstance.delete(`/card/${id}`);
    if (data.message === "success") {
      setCards((prev) => prev.filter((el) => el.id !== id));
    }
  };


  useEffect(() => {
    loadUserCards();
    loadCategory();
  }, [user]);

  return (
    <>
 
      <form onSubmit={createCard}>
        <input
          type="text"
          name="title"
          placeholder="title"
          onChange={(e) =>
            setForm((prevValue) => ({ ...prevValue, title: e.target.value }))
          }
        />
        <input
          type="text"
          name="description"
          placeholder="description"
          onChange={(e) =>
            setForm((prevValue) => ({
              ...prevValue,
              description: e.target.value,
            }))
          }
        />
        <input
          type="text"
          name="price"
          placeholder="price"
          onChange={(e) =>
            setForm((prevValue) => ({ ...prevValue, price: e.target.value }))
          }
        />
        <input
          type="text"
          name="image"
          placeholder="image"
          onChange={(e) =>
            setForm((prevValue) => ({ ...prevValue, image: e.target.value }))
          }
        />
        <select
          onChange={(e) =>
            setForm((prevValue) => ({
              ...prevValue,
              category_id: e.target.value,
            }))
          }
        >
          {category.map((category) => (
            <option key={category?.id} value={category?.id} >
              {category?.category_name}
            </option>
          ))}
        </select>

        <button type="submit" onClick={createCard}>
          Добавить
        </button>
      </form>
      <br />
      <br />
      
      
      {cards.map((el) => (
        <div key={el.id}>
          <div>{el.title}</div>
          <div>{el.description}</div>
          <div>{el.price}</div>
          <img src={el.image} />
          <button onClick={() => deleteCard(el.id)}>Удалить</button>
          
        </div>
        
      ))}
      
    </>
  );
}

export default PersonalAccount;
