import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/LoginPage/login.js"
import HomePage from "./pages/Home/home.js";
import NotFound from "./pages/NotFound/notFound.js";

function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>  
          <Route path="/login" element={<Login />}/>
          <Route path="/home" element={<HomePage />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
