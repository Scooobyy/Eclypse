import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ShippingPage from './pages/ShippingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';  // <-- import the new CartPage component
import { Toaster } from 'react-hot-toast';
import ExplorePage from './pages/ExplorePage';

function App() {
  return (
<>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<HomePage />} />
         <Route path="/explore" element={<ExplorePage/>} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/cart" element={<CartPage />} />  {/* <-- add cart route here */}
        
      </Routes>

    </>
  );
}

export default App;
