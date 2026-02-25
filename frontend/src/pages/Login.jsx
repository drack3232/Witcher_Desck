import { Link } from 'react-router-dom';
import '../App.css'
function Login() {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src='./wolf.png' alt="Witcher medallion" className='auth-logo' />
        <h1>Вхід у Бестіарій</h1>
        <form className="auth-form">
          <div className="input-group">
            <label>Електронна пошта</label>
            <input type="email" placeholder="witcher@kaermorhen.com" />
          </div>
          <div className="input-group">
            <label>Пароль</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <button type="submit" className="primary-btn">Увійти</button>
        </form>
        <p className="auth-switch">
          Ще не маєш медальйона? <Link to="/register">Зареєструватися</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;