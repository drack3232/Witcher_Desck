import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Кнопка натиснута! Дані:", username, email, password);

    axios.post('http://localhost:8081/api/auth/register', {
      username: username,
      email: email,
      password: password
    })
    .then(response => { 
      navigate('/login');
    })
    .catch(error => {
      if (error.response) {
        alert(error.response.data); 
      } else {
        console.error("Помилка підключення до сервера", error);
      }
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src="/wolf.png" alt="Witcher Medallion" className="auth-logo" />
        <h1>Випробування Травами</h1>
        
        {/* Форма з правильним обробником */}
        <form className="auth-form" onSubmit={handleRegister}>
          <div className="input-group">
            <label>Ім'я (Псевдонім)</label>
            <input 
              type="text" 
              placeholder="Geralt" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <label>Електронна пошта</label>
            <input 
              type="email" 
              placeholder="witcher@kaermorhen.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <label>Пароль</label>
            <input 
              type="password" 
              placeholder="Створи надійний пароль" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="primary-btn">Пройти мутацію (Реєстрація)</button>
        </form>
        
        <p className="auth-switch">
          Вже є акаунт? <Link to="/login">Увійти</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;