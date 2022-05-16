import { Route, Routes } from "react-router-dom";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { ProductList } from "./components/ProductsList";
import { ProductDetails } from "./components/ProductDetails";
import { BinList } from "./components/BinList";
import {User} from "./components/User"

export function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="registro" element={<Signup />} />
        <Route path="inicio" element={<Home />} />
        <Route path="productos" element={<ProductList />} />
        <Route path="producto" element={<ProductDetails />} />
        <Route path="canecas" element={<BinList />} />
        <Route path="perfil" element={<User />} />
      </Routes>
    </>

  );
}

