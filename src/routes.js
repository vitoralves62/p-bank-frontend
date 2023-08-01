import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/LoginPage/login.js"
import HomePage from "./pages/Home/home.js";

function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/home" element={<HomePage />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
