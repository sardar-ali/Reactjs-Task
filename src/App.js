import "./App.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Products from './components/Products';
import Home from "./components/Home";
// import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <>
      <Home />
    </>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/products" element={<Products />} />
    //     <Route path="/product/:id" element={<ProductDetails />} />
    //     <Route path="*" element={<h2>page note found</h2>} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
