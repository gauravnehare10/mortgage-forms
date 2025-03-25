import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/MainApp/Home/Home';
import NavBar from './Components/MainApp/NavBar/NavBar';
import Mortgage from './Components/Mortgage/Mortgage/Mortgage';
import MortgageDataApp from './Components/Mortgage/MortgageApp';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/mortgage' element={<Mortgage /> }/>
        <Route path="/mortgage/add-details/*" element={<MortgageDataApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
