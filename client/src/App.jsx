import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Registration from "./pages/Registration";
import Authorization from "./pages/Authorization";
import Home from "./pages/Home";
import LogOut from "./pages/LogOut";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Authorization" element={<Authorization />} />
        <Route path="/Logout" element={<LogOut />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
