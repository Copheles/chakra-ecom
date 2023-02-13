import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import Navbar from "./components/Navbar";
import CartScreen from "./screens/CartScreen";
import { LandingScreen } from "./screens/LandingScreen";
import ProductScreen from "./screens/ProductScreen";
import ProductsScreen from "./screens/ProductsScreen";
import theme from "./theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingScreen />}></Route>
            <Route path="/cart" element={<CartScreen />}></Route>
            <Route path="/products" element={<ProductsScreen />}></Route>
            <Route path="/products/:id" element={<ProductScreen />}></Route>
          </Routes>
        </main>
        <Footer/>
      </Router>
    </ChakraProvider>
  );
}

export default App;
