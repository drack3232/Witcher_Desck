import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Випробування Травами</h1>
        <form className="auth-form">
          <div className="input-group">
            <label>Ім'я (Псевдонім)</label>
            <input type="text" placeholder="Geralt" />
          </div>
          <div className="input-group">
            <label>Електронна пошта</label>
            <input type="email" placeholder="witcher@kaermorhen.com" />
          </div>
          <div className="input-group">
            <label>Пароль</label>
            <input type="password" placeholder="Створи надійний пароль" />
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