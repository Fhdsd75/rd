import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  // Состояние темы (false = светлая, true = тёмная)
  const [isDarkMode, setIsDarkMode] = useState(false);
  // Состояние языка (true = KZ, false = RU)
  const [isKazakh, setIsKazakh] = useState(true);

  // Переключение темы
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  // Переключение языка
  const toggleLanguage = () => {
    setIsKazakh(!isKazakh);
  };

  // Пути к иконкам (размер 24x24) для переключателя темы
  const sunActive    = '/img/sun-activ.png';    // Солнышко (активная)
  const sunInactive  = '/img/sun-noactiv.png';   // Солнышко (неактивная)
  const moonActive   = '/img/moon-activ.png';     // Луна (активная)
  const moonInactive = '/img/moon-noactiv.png';   // Луна (неактивная)

  return (
    <header className="header">
      <div className="header-content">
        {/* (1) Переключатель языка */}
        <div
          className={`language-toggle ${isKazakh ? '' : 'lang-dark'}`}
          onClick={toggleLanguage}
        >
          <div className="toggle-circle"></div>
          <div className="language-text">
            <span>KZ</span>
            <span>RU</span>
          </div>
        </div>

        {/* (2) Кнопка "Главное" */}
        <button className="nav-button main-button">Главное</button>

        {/* (3) Кнопка "Контакты" */}
        <button className="nav-button contact-button">Контакты</button>

        {/* (4) Логотип */}
        <div className="logo">
          <img src="/img/image.png" alt="Логотип" />
        </div>

        {/* (5) Кнопка "О нас" */}
        <button className="nav-button about-button">О нас</button>

        {/* (6) Кнопка "Профиль" */}
        <Link to="/logauth">
          <button className="nav-button profile-button">Профиль</button>
        </Link>

        {/* (7) Переключатель темы */}
        <div className="theme-toggle" onClick={toggleTheme}>
          <img
            src={isDarkMode ? sunInactive : sunActive}
            alt="Sun Icon"
            className="toggle-icon left-icon"
          />
          <img
            src={isDarkMode ? moonActive : moonInactive}
            alt="Moon Icon"
            className="toggle-icon right-icon"
          />
          <div className={`toggle-circle ${isDarkMode ? 'dark' : ''}`}>
            <img
              src={sunActive}
              alt="Sun Active"
              className={`circle-icon ${isDarkMode ? 'fade-out' : 'fade-in'}`}
            />
            <img
              src={moonActive}
              alt="Moon Active"
              className={`circle-icon ${isDarkMode ? 'fade-in' : 'fade-out'}`}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
