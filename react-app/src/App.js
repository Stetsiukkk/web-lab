import logo from './logo.svg';
//import './App.css';
import Index from './pages/Index';
import Reserv from './pages/Reserv';
import Login from './pages/Login';
import Register from './pages/Register';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element = {<Index />} />
          <Route path='/reserv' element = {<Reserv />} />
          <Route path='/login' element = {<Login />} />
          <Route path='/register' element = {<Register />} />
        </Routes>
      </Router>

      
    </div>
  );
}

export default App;
