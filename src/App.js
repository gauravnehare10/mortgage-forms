import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/MainApp/Home/Home';
import NavBar from './Components/MainApp/NavBar/NavBar';
import Mortgage from './Components/Mortgage/Mortgage/Mortgage';
import MortgageDataApp from './Components/Mortgage/MortgageApp';
import MortgageViewApp from './Components/Mortgage/MortgageViewApp';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/mortgage' element={<Mortgage /> }/>
        <Route path="/mortgage/add-details/*" element={<MortgageDataApp />} />
        <Route path='/mortgage/*' element={<MortgageViewApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;