import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from './components/Products';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<h2>page note found</h2>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
