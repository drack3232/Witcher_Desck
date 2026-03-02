import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import "../App.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:8081/api/auth/login", {
                email: email,
                password: password,
            })
            .then((response) => {
                navigate("/home");
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data);
                } else {
                    console.error("Помилка підключення", error);
                }
            });
    };

    return (
        <div className="auth-container ">
            <div className="auth-box">
                <img
                    src="/wolf.png"
                    alt="Witcher medallion"
                    className="auth-logo"
                />
                <h1>Вхід у Бестіарій</h1>

                <form className="auth-form" onSubmit={handleLogin}>
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
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="primary-btn">
                        Увійти
                    </button>
                </form>

                <p className="auth-switch">
                    Ще не маєш медальйона?{" "}
                    <Link to="/register">Зареєструватися</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
