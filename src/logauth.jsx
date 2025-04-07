import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // <-- Чтобы перейти к Header.jsx ("/")
import "./logauth.css";
import { REGISTER_URL } from "./cfg";
import { login, getMe } from "./auth";

/* ====== Форма входа (левая панель) ====== */
function SignInForm({ onForgotPasswordClick }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const sanitizeInput = (input) =>
    input.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const sanitizedUsername = sanitizeInput(username);
    const sanitizedPassword = sanitizeInput(password);

    // Если нет '@', проверяем, что это минимум 12 цифр (ИИН)
    if (
      !sanitizedUsername.includes("@") &&
      !/^\d{12,}$/.test(sanitizedUsername)
    ) {
      setMessage("Введите корректный Email или ИИН (минимум 12 цифр).");
      return;
    }

    try {
      const result = await login({
        username: sanitizedUsername,
        password: sanitizedPassword,
      });
      setMessage("Успешный вход! Токены получены.");
      console.log("Access Token:", result.access_token);
      console.log("Refresh Token:", result.refresh_token);
      // Можно вызвать getMe() при необходимости
    } catch (err) {
      setMessage(err.message || "Ошибка соединения с сервером");
    }
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <h2 className="title">Вход в RD</h2>
      {message && <div className="alert-message">{message}</div>}
      <span>или используйте ваш Email / ИИН:</span>
      <input
        type="text"
        placeholder="Email или ИИН"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />
      <a href="#!" className="forgot" onClick={onForgotPasswordClick}>
        Забыли пароль?
      </a>
      <button type="submit" className="btn">
        Войти
      </button>
    </form>
  );
}

/* ====== Форма регистрации (правая панель) ====== */
function SignUpForm() {
  const [iin, setIin] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const sanitizeInput = (input) =>
    input.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const validateIIN = (value) => {
    if (value.includes("@")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    } else {
      const digitsRegex = /^\d{12,}$/;
      return digitsRegex.test(value);
    }
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+7\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const sanitizedIin = sanitizeInput(iin);
    const sanitizedPhone = sanitizeInput(phone);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);
    const sanitizedConfirmPassword = sanitizeInput(confirmPassword);

    if (!validateIIN(sanitizedIin)) {
      setMessage(
        "Введите корректный ИИН (12 цифр) или email (с '@' и '.')"
      );
      return;
    }
    if (!validatePhone(sanitizedPhone)) {
      setMessage(
        "Введите корректный номер телефона: +7XXXXXXXXXX (10 цифр после +7)."
      );
      return;
    }
    if (sanitizedPassword !== sanitizedConfirmPassword) {
      setMessage("Пароли не совпадают.");
      return;
    }

    try {
      const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          iin: sanitizedIin,
          phone: sanitizedPhone,
          email: sanitizedEmail,
          password: sanitizedPassword,
          confirm_password: sanitizedConfirmPassword,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        setMessage(result.detail || "Ошибка регистрации");
      } else {
        setMessage("Успешная регистрация! Токены получены.");
        console.log("Access Token:", result.access_token);
        console.log("Refresh Token:", result.refresh_token);
      }
    } catch (err) {
      setMessage("Ошибка соединения с сервером");
    }
  };

  return (
    <form onSubmit={handleRegisterSubmit}>
      <h2 className="title">Создать аккаунт в RD</h2>
      {message && <div className="alert-message">{message}</div>}
      <span>или используйте вашу почту / ИИН:</span>
      <input
        type="text"
        placeholder="ИИН (12 цифр)"
        value={iin}
        onChange={(e) => setIin(e.target.value)}
        required
        minLength={12}
        maxLength={12}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="tel"
        placeholder="Телефон (+7XXXXXXXXXX)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />
      <input
        type="password"
        placeholder="Подтвердите пароль"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        minLength={6}
      />
      <button type="submit" className="btn">
        Регистрация
      </button>
    </form>
  );
}

/* ====== Модальное окно "Забыли пароль?" ====== */
function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [timerId, setTimerId] = useState(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const requestCode = () => {
    if (!validateEmail(email)) {
      setMessage("Введите корректный Email.");
      return;
    }
    setMessage("");
    setCountdown(60);
    const id = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setTimerId(id);
  };

  const handleRestore = () => {
    if (!/^\d{5}$/.test(code)) {
      setMessage("Введите корректный 5-значный код.");
      return;
    }
    setMessage("Инструкция по восстановлению пароля отправлена на вашу почту.");
  };

  useEffect(() => {
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [timerId]);

  return (
    <>
      <h2>Восстановление пароля</h2>
      {message && <div className="alert-message">{message}</div>}
      <div className="input-group">
        <label>Email:</label>
        <input
          type="email"
          placeholder="Введите Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-group code-group">
        <label>Код:</label>
        <input
          type="text"
          placeholder="Введите 5-значный код"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={5}
        />
        <button
          type="button"
          className="btn code-btn"
          onClick={requestCode}
          disabled={countdown > 0}
        >
          {countdown > 0 ? `${countdown} сек` : "Запросить код"}
        </button>
      </div>
      <button
        type="button"
        className="btn restore-btn"
        onClick={handleRestore}
        disabled={!/^\d{5}$/.test(code)}
      >
        Восстановить
      </button>
      <button type="button" className="btn back-btn" onClick={onBack}>
        Назад
      </button>
    </>
  );
}

function App() {
  const [rightPanelActive, setRightPanelActive] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Переключение панелей (Вход / Регистрация)
  const handleSignUpClick = () => {
    setRightPanelActive(true);
    setShowForgotPassword(false);
  };

  const handleSignInClick = () => {
    setRightPanelActive(false);
    setShowForgotPassword(false);
  };

  // Открыть окно восстановления
  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  // Закрыть окно восстановления
  const handleBack = () => {
    setShowForgotPassword(false);
  };

  return (
    <div
      className={`container ${rightPanelActive ? "right-panel-active" : ""}`}
    >
      {/* Левая панель (Вход) */}
      <div className="form-container sign-in-container">
        {/* Форма входа */}
        <SignInForm onForgotPasswordClick={handleForgotPasswordClick} />

        {/* Кнопка "Назад" внизу слева (не ломает дизайн) */}
        <Link to="/" className="back-bottom-left">
          <button className="btn back-home-btn">Назад</button>
        </Link>
      </div>

      {/* Правая панель (Регистрация) */}
      <div className="form-container sign-up-container">
        {/* Форма регистрации */}
        <SignUpForm />

        {/* Кнопка "Назад" внизу слева (аналогично) */}
        <Link to="/" className="back-bottom-left">
          <button className="btn back-home-btn">Назад</button>
        </Link>
      </div>

      {/* Чёрный оверлей (для переключения панелей) */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Привет, друг!</h1>
            <p>Введите свои личные данные и начните путешествие с нами</p>
            <button className="ghost btn" onClick={handleSignInClick}>
              Войти
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Добро пожаловать назад!</h1>
            <p>Чтобы оставаться с нами, войдите в свой аккаунт</p>
            <button className="ghost btn" onClick={handleSignUpClick}>
              Регистрация
            </button>
          </div>
        </div>
      </div>

      {/* Модальное окно "Забыли пароль?" */}
      <div
        className={`forgot-overlay ${showForgotPassword ? "show" : ""}`}
        onClick={handleBack}
      ></div>
      <div
        className={`forgot-password-panel ${
          showForgotPassword ? "show" : ""
        }`}
      >
        <ForgotPassword onBack={handleBack} />
      </div>
    </div>
  );
}

export default App;
