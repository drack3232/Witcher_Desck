import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Board from './pages/Board';
import Home from './pages/Home';
import Bestiary from './pages/Bestiary';
import History from './pages/History'

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
       
       <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/board" element={<Board />} />
        <Route path="/home" element={<Home />} />
        <Route path="/bestiary/:id" element={<Bestiary />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;