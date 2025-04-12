import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  // Тёмная тема по умолчанию, язык по умолчанию — русский
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isKazakh, setIsKazakh] = useState(false);
  const [activeButton, setActiveButton] = useState('logo');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('User');
  const [editingName, setEditingName] = useState(false);

  // Тексты
  const texts = {
    ru: {
      navTests: "Тесты",
      navStats: "Статистика",
      navSubscriptions: "Подписки",
      navProfile: "Профиль",
      sidebarStatistics: "Статистика",
      sidebarProfile: "Профиль",
      sidebarTests: "Тесты",
      sidebarSub: "Подписки",
      sidebarThemeDark: "Тёмная тема",
      sidebarThemeLight: "Светлая тема",
      sidebarAbout: "О нас",
      sidebarInfo: "Информация",
      sidebarHelp: "Помощь",
      exit: "Выйти"
    },
    kz: {
      navTests: "Тесттер",
      navStats: "Статистика",
      navSubscriptions: "Жазылымдар",
      navProfile: "Профиль",
      sidebarStatistics: "Статистика",
      sidebarProfile: "Профиль",
      sidebarTests: "Тесттер",
      sidebarSub: "Жазылымдар",
      sidebarThemeDark: "Қараңғы тақырып",
      sidebarThemeLight: "Жарық тақырып",
      sidebarAbout: "Біз туралы",
      sidebarInfo: "Ақпарат",
      sidebarHelp: "Көмек",
      exit: "Шығу"
    }
  };
  const currentLanguage = isKazakh ? texts.kz : texts.ru;

  // Тема
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
  };

  // Язык
  const toggleLanguage = () => {
    setIsKazakh(!isKazakh);
  };

  // Сайд-бар
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="header">
        <div className="header-content">
          {/* Левая секция: бургер-меню */}
          <div className="header-left">
            <div className="burger-menu" onClick={toggleSidebar}>
              <div className="burger-bar"></div>
              <div className="burger-bar"></div>
              <div className="burger-bar"></div>
            </div>
          </div>

          {/* Центральная секция: 2 кнопки, логотип, 2 кнопки */}
          <div className="header-center">
            <button
              className={`nav-button main-button ${activeButton === 'tests' ? 'active' : ''}`}
              onClick={() => setActiveButton('tests')}
            >
              {currentLanguage.navTests}
            </button>
            <button
              className={`nav-button contact-button ${activeButton === 'stats' ? 'active' : ''}`}
              onClick={() => setActiveButton('stats')}
            >
              {currentLanguage.navStats}
            </button>
            <Link to="/" onClick={() => setActiveButton('logo')}>
              <div className={`logo ${activeButton === 'logo' ? 'active' : ''}`}>
                <img src="/img/image.png" alt="Логотип RD" />
              </div>
            </Link>
            <button
              className={`nav-button about-button ${activeButton === 'subscriptions' ? 'active' : ''}`}
              onClick={() => setActiveButton('subscriptions')}
            >
              {currentLanguage.navSubscriptions}
            </button>
            <Link to="/logauth" onClick={() => setActiveButton('profile')}>
              <button
                className={`nav-button profile-button ${activeButton === 'profile' ? 'active' : ''}`}
              >
                {currentLanguage.navProfile}
              </button>
            </Link>
          </div>

          {/* Правая секция: переключатель языка */}
          <div className="header-right">
            <div
              className={`language-toggle2 ${isKazakh ? 'kz-active' : 'ru-active'}`}
              onClick={toggleLanguage}
            >
              <span className="lang-kz">KZ</span>
              <span className="lang-ru">RU</span>
              <div className="toggle-circle"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Оверлей при открытом сайд-баре */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {/* Сайд-бар */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header user-info">
          <div className="user-avatar">
            <div className="avatar-circle">
              <img src="/img/avatar.png" alt="User Avatar" className="user-avatar-img" />
            </div>
          </div>
          <div className="user-name-edit">
            {editingName ? (
              <input
                className="edit-username"
                value={userName}
                autoFocus
                onChange={(e) => setUserName(e.target.value)}
                onBlur={() => setEditingName(false)}
              />
            ) : (
              <div className="display-username">
                {userName}
                <button className="edit-btn" onClick={() => setEditingName(true)}>
                  <img src="/img/edit.png" alt="Edit Icon" className="edit-icon" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Кнопки сайд-бар */}
        <div className="sidebar-content">
          <button
            className="sidebar-btn sidebar-btn-statistics"
            onClick={() => setActiveButton('stats')}
          >
            <img src="/img/stat.png" alt="" className="sidebar-icon-statistics" />
            <span>{currentLanguage.sidebarStatistics}</span>
          </button>

          <Link to="/logauth" onClick={() => setActiveButton('profile')}>
            <button className="sidebar-btn sidebar-btn-profile">
              <img src="/img/Profile.png" alt="" className="sidebar-icon-profile" />
              <span>{currentLanguage.sidebarProfile}</span>
            </button>
          </Link>

          <button
            className="sidebar-btn sidebar-btn-tests"
            onClick={() => setActiveButton('tests')}
          >
            <img src="/img/tests.png" alt="" className="sidebar-icon-tests" />
            <span>{currentLanguage.sidebarTests}</span>
          </button>

          <button
            className="sidebar-btn sidebar-btn-sub"
            onClick={() => setActiveButton('subscriptions')}
          >
            <img src="/img/sub.png" alt="" className="sidebar-icon-sub" />
            <span>{currentLanguage.sidebarSub}</span>
          </button>

          {/* Переключатель темы */}
          <button className="sidebar-btn sidebar-btn-theme" onClick={toggleTheme}>
            <img
              src={isDarkMode ? "/img/sun.png" : "/img/moon.png"}
              alt=""
              className="sidebar-icon-theme"
            />
            <span>
              {isDarkMode
                ? currentLanguage.sidebarThemeLight
                : currentLanguage.sidebarThemeDark}
            </span>
          </button>

          <hr className="sidebar-divider" />

          <button className="sidebar-btn sidebar-btn-about">
            <img src="/img/info.png" alt="" className="sidebar-icon-about" />
            <span>{currentLanguage.sidebarAbout}</span>
          </button>

          <button className="sidebar-btn sidebar-btn-info">
            <img src="/img/info.png" alt="" className="sidebar-icon-info" />
            <span>{currentLanguage.sidebarInfo}</span>
          </button>

          <button className="sidebar-btn sidebar-btn-help">
            <img src="/img/help.png" alt="" className="sidebar-icon-help" />
            <span>{currentLanguage.sidebarHelp}</span>
          </button>
        </div>

        <div className="sidebar-footer">
          <button className="exit-btn">{currentLanguage.exit}</button>
        </div>
      </div>

      {/* === Кнопки (WhatsApp, Instagram, Telegram) в нижнем правом углу === */}
      <div className="floating-links">
        {/* WhatsApp */}
        <a
          href="https://wa.me/77079477747"
          target="_blank"
          rel="noreferrer"
          className="floating-button"
        >
          <img src="/img/whatsapp.png" alt="WhatsApp" />
        </a>
        {/* Instagram */}
        <a
          href="https://www.instagram.com/royal_driving/"
          target="_blank"
          rel="noreferrer"
          className="floating-button"
        >
          <img src="/img/instagram.png" alt="Instagram" />
        </a>
        {/* Telegram */}
        <a
          href="https://t.me/AILbIU_3AKAT"
          target="_blank"
          rel="noreferrer"
          className="floating-button"
        >
          <img src="/img/telegram.png" alt="Telegram" />
        </a>
      </div>
    </>
  );
};

export default Header;
