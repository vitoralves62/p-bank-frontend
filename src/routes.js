import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/LoginPage/login.js"
import HomePage from "./pages/Home/home.js";
import NotFound from "./pages/NotFound/notFound.js";
import AdminPage from "./pages/Admin/adminPage.js";

function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>  
          <Route path="/login" element={<Login />}/>
          <Route path="/home" element={<HomePage />}/>
          <Route path='*' element={<NotFound />}/>
          <Route path='/admin' element={<AdminPage/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
