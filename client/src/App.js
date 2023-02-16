import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import Navbar from "./components/Navbar";
import CartScreen from "./screens/CartScreen";
import { LandingScreen } from "./screens/LandingScreen";
import LoginScreen from "./screens/LoginScreen";
import ProductScreen from "./screens/ProductScreen";
import ProductsScreen from "./screens/ProductsScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import theme from "./theme";
import ProfileScreen from './screens/ProfileScreen';

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
            <Route path='/login' element={<LoginScreen />}></Route>
            <Route path='/registration' element={<RegistrationScreen />}></Route>
            <Route path='/profile' element={<ProfileScreen />}></Route>
          </Routes>
        </main>
        <Footer/>
      </Router>
    </ChakraProvider>
  );
}

export default App;
