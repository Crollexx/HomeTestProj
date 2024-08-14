import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Registration from "./pages/Registration";
import Authorization from "./pages/Authorization";
import Home from "./pages/Home";
import LogOut from "./pages/LogOut";
import { useEffect, useState } from "react";
import apiAxiosInstance, { setAccessToken } from "./service/axiosInstance";

function App() {
const [user, setUser] = useState(null)

useEffect(() =>{
apiAxiosInstance.get('/token/refresh')
.then(({data}) => {
  setAccessToken(data.accessToken)
  setUser(data.user)
})
},[])


  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Registration" element={<Registration />} setUser={setUser} />
        <Route path="/Authorization" element={<Authorization />}  />
        <Route path="/Logout" element={<LogOut />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
