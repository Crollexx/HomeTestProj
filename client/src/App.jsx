import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Registration from "./pages/Registration";
import Authorization from "./pages/Authorization";
import Home from "./pages/Home";
import LogOut from "./pages/LogOut";
import { useEffect, useState } from "react";
import apiAxiosInstance, { setAccessToken } from "./service/axiosInstance";

function App() {
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState([])



  useEffect(() => {
    apiAxiosInstance.get("/token/refresh").then(({ data }) => {
      setAccessToken(data.accessToken);
      setUser(data.user);
    });
  }, []);

  return (
    <BrowserRouter>
      <Nav user={user} />
      <Routes>
        <Route path="/" element={<Home user={user} cards={cards} setCards={setCards} />} />
        <Route
          path="/Registration"
          element={<Registration setUser={setUser} />}
        />
        <Route
          path="/Authorization"
          element={<Authorization setUser={setUser} />}
        />
        <Route
          path="/Logout"
          element={<LogOut user={user} setUser={setUser} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
