import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './Components/MainApp/NavBar/NavBar';
import Mortgage from "./Components/Mortgage/Mortgage";
import MortgageApp from './Components/MortgageApp/MortgageApp';
import MortgageViewApp from './Components/MortgageViewApp/MortgageViewApp';
import PrivateRoute from "./utils/PrivateRoute"
import Login from './Components/MainApp/auth/Login/Login';
import Register from './Components/MainApp/auth/Register/Register';
import FloatingProfile from './Components/MainApp/Profile/FloatingProfile/FloatingProfile';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/" element={<Mortgage />} />
        <Route path='/profile' element={
          <PrivateRoute>
            <FloatingProfile />
          </PrivateRoute>
        } />
        <Route path='/mortgage/*' element={
          <PrivateRoute>
            <MortgageViewApp />
          </PrivateRoute>
        } />
        <Route path='/mortgage/add-data/*' element={
          <PrivateRoute>
            <MortgageApp />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;