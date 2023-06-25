import { Route, Routes, BrowserRouter as Router,  } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import AdminPage from "./pages/Admin";

function App() {

  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/products/*" element = {<ProductList/>}/>
        <Route path="/product/*" element = {<Product/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
      </Routes>
      </Router>
    </div>
  );
}
export default App;
