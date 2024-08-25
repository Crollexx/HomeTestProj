import { useParams } from "react-router-dom";
import apiAxiosInstance from "../service/axiosInstance";
import { useEffect, useState } from "react";

function PersonalAccount({ user, setUser, cards, setCards }) {
  const [category, setCategory] = useState([]);
  const [form, setForm] = useState({
    title: null,
    description: null,
    price: null,
    image: null,
    category_id: null,
    user_id: null,
  });

  const { id } = useParams();

  const loadCategory = async () => {
    const { data } = await apiAxiosInstance.get("/category");
      
      setCategory(data);
      console.log(data);  
      
    
  };
  const createCard = async (e) => {
    e.preventDefault();
    const { data } = await apiAxiosInstance.post("/card", { ...form, user_id: user.id} );
    console.log(data);
    
    if (data.message === "success") {
      setCards((prev) => [...prev, data.card]);
            
    }
  };

  useEffect(() => {
    loadCategory();
  }, []);

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
            setForm((prevValue) => ({ ...prevValue, description: e.target.value }))
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
          setForm((prevValue) => ({ ...prevValue, category_id: e.target.value }))
        }
      >
        {category.map((category) => (
          <option key={category.id} value={category.id}>
            {category.category_name}
          </option>
        ))}
      </select>
      
        <button type="submit" onClick={createCard} >Добавить</button>
      </form>
    </>
  );
}

export default PersonalAccount;
