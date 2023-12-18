import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import User from './components/User/User';
import Auth from './components/Auth/Auth';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Navbar></Navbar>
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/users/:userId" element={<User />} />
             <Route path="/auth" element={<Auth />} />
           </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
