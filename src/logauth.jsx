import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./logauth.css";


import { REGISTER_URL } from "./cfg";
import { login } from "./auth";

// Валидация ИИН
function validateIIN(iin) {
  if (!/^\d{12}$/.test(iin)) {
    return "ИИН должен состоять ровно из 12 цифр.";
  }
  const dayPart = parseInt(iin.substring(0, 2), 10);
  if (dayPart < 1 || dayPart > 31) {
    return "Первые две цифры ИИН должны быть в диапазоне 01–31.";
  }
  const monthPart = parseInt(iin.substring(2, 4), 10);
  if (monthPart < 1 || monthPart > 12) {
    return "3-я и 4-я цифры ИИН должны быть в диапазоне 01–12.";
  }
  return null;
}

// Валидация ФИО
const bannedWords = ["гитлер", "сука", "блять"];
function validateFIO(fio) {
  const lower = fio.toLowerCase();
  for (const w of bannedWords) {
    if (lower.includes(w)) {
      return `Недопустимое слово в ФИО: “${w}”`;
    }
  }
  return null;
}

// Компонент формы входа
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

    if (
      !sanitizedUsername.includes("@") &&
      !/^\d{12}$/.test(sanitizedUsername)
    ) {
      setMessage("Введите корректный Email или ИИН (12 цифр).");
      return;
    }
    try {
      const result = await login({
        username: sanitizedUsername,
        password: sanitizedPassword,
      });
      setMessage("Успешный вход!");
      console.log("Access Token:", result.access_token);
      console.log("Refresh Token:", result.refresh_token);
    } catch (err) {
      setMessage(err.message || "Ошибка соединения с сервером");
    }
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <h2 className="title">Вход</h2>
      {message && <div className="alert-message">{message}</div>}
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
      {/* Обновленная кнопка "Забыли пароль?" */}
      <button
        type="button"
        className="forgot"
        onClick={onForgotPasswordClick}
      >
        Забыли пароль?
      </button>
      <button type="submit" className="btn">
        Войти
      </button>
    </form>
  );
}

// Компонент формы регистрации
function SignUpForm() {
  const [iin, setIin] = useState("");
  const [fio, setFio] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const sanitizeInput = (input) =>
    input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const validatePhone = (phone) => /^\+7\d{10}$/.test(phone);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const sIin = sanitizeInput(iin);
    const sFio = sanitizeInput(fio);
    const sPhone = sanitizeInput(phone);
    const sEmail = sanitizeInput(email);
    const sPassword = sanitizeInput(password);
    const sConfirm = sanitizeInput(confirmPassword);

    const iinError = validateIIN(sIin);
    if (iinError) {
      setMessage(iinError);
      return;
    }
    const fioError = validateFIO(sFio);
    if (fioError) {
      setMessage(fioError);
      return;
    }
    if (!validatePhone(sPhone)) {
      setMessage("Номер телефона должен быть в формате +7XXXXXXXXXX.");
      return;
    }
    if (sPassword !== sConfirm) {
      setMessage("Пароли не совпадают.");
      return;
    }

    try {
      const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          iin: sIin,
          fio: sFio,
          phone: sPhone,
          email: sEmail,
          password: sPassword,
          confirm_password: sConfirm,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        setMessage(result.detail || "Ошибка регистрации");
      } else {
        setMessage("Регистрация успешна!");
        console.log("Access Token:", result.access_token);
        console.log("Refresh Token:", result.refresh_token);
      }
    } catch (err) {
      setMessage("Ошибка соединения с сервером");
    }
  };

  return (
    <form onSubmit={handleRegisterSubmit}>
      <h2 className="title">Регистрация</h2>
      {message && <div className="alert-message">{message}</div>}
      <input
        type="text"
        placeholder="ИИН (12 цифр)"
        value={iin}
        onChange={(e) => setIin(e.target.value)}
        required
        maxLength={12}
      />
      <input
        type="text"
        placeholder="ФИО"
        value={fio}
        onChange={(e) => setFio(e.target.value)}
        required
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
        placeholder="+7XXXXXXXXXX"
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
        Зарегистрироваться
      </button>
    </form>
  );
}

// Компонент восстановления пароля
function ForgotPassword({ onClose }) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(0);

  const validateEmail = (val) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const requestCode = () => {
    if (!validateEmail(email)) {
      setMessage("Введите корректный Email.");
      return;
    }
    setMessage("Код отправлен на ваш Email.");
    setCountdown(60);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleRestore = () => {
    if (!/^\d{5}$/.test(code)) {
      setMessage("Введите 5-значный код.");
      return;
    }
    setMessage("Пароль восстановлен. Проверьте Email.");
  };

  return (
    <div className="forgot-password-panel-inner">
      <h2>Восстановить пароль</h2>
      {message && <div className="alert-message">{message}</div>}
      <div className="input-group">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="input-group code-group">
        <input
          type="text"
          placeholder="5-значный код"
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
          {countdown > 0 ? `${countdown} сек` : "Получить код"}
        </button>
      </div>
      <button
        type="button"
        className="btn restore-btn"
        onClick={handleRestore}
      >
        Восстановить
      </button>
      <button type="button" className="btn back-btn" onClick={onClose}>
        Закрыть
      </button>
    </div>
  );
}

// Основной компонент
function App() {
  const [activeForm, setActiveForm] = useState("signin"); // "signin" или "signup"
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSignInClick = () => {
    setActiveForm("signin");
    setShowForgotPassword(false);
  };

  const handleSignUpClick = () => {
    setActiveForm("signup");
    setShowForgotPassword(false);
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const handleCloseForgotPassword = () => {
    setShowForgotPassword(false);
  };

  return (
    <div
      className={`container ${
        activeForm === "signup" ? "right-panel-active" : ""
      }`}
    >
      {/* Переключатель форм для мобильных устройств */}
      <div className="mobile-toggle">
        <button
          className={`toggle-btn ${activeForm === "signin" ? "active" : ""}`}
          onClick={handleSignInClick}
        >
          Вход
        </button>
        <button
          className={`toggle-btn ${activeForm === "signup" ? "active" : ""}`}
          onClick={handleSignUpClick}
        >
          Регистрация
        </button>
      </div>

      {/* Форма входа */}
      <div
        className={`form-container sign-in-container ${
          activeForm === "signin" ? "active" : ""
        }`}
      >
        <SignInForm onForgotPasswordClick={handleForgotPasswordClick} />
      </div>

      {/* Форма регистрации */}
      <div
        className={`form-container sign-up-container ${
          activeForm === "signup" ? "active" : ""
        }`}
      >
        <SignUpForm />
      </div>

      {/* Модальное окно восстановления пароля */}
      <div
        className={`forgot-overlay ${showForgotPassword ? "show" : ""}`}
        onClick={handleCloseForgotPassword}
      />
      <div
        className={`forgot-password-panel ${showForgotPassword ? "show" : ""}`}
      >
        <ForgotPassword onClose={handleCloseForgotPassword} />
      </div>

      {/* Оверлей для десктопа */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Уже с нами?</h1>
            <p>Войдите, чтобы продолжить</p>
            <button className="ghost btn" onClick={handleSignInClick}>
              Войти
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Новый пользователь?</h1>
            <p>Создайте аккаунт прямо сейчас</p>
            <button className="ghost btn" onClick={handleSignUpClick}>
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
