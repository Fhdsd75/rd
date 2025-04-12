import React from "react";
import "./Body.css";

const Home = () => {
  return (
    <>
      {/* Секция основного контента */}
      <section className="home-body">
        {/* Левая колонка – текст */}
        <div className="body-content">
          <h1 className="title">ROYAL DRIVING</h1>
          <p className="description">
            Освойте искусство вождения с профессиональными инструкторами и
            индивидуальным подходом! Мы обучаем с нуля, помогаем уверенно
            чувствовать себя на дороге и готовим к успешной сдаче экзаменов.
          </p>
          <button className="cta-button">ПЕРЕЙТИ К ТЕСТАМ</button>
        </div>

        {/* Правая колонка – изображение с кругами */}
        <div className="body-image">
          <div className="circle-inner">
            <img
              src="/img/girl_with_license.png"
              alt="Девушка с водительскими правами и ключами"
              className="img-offset"
            />
          </div>
        </div>
      </section>

      {/* Секция "Тарифы" */}
      <section className="tariffs-section">
        <h2 className="tariffs-title">Тарифы</h2>
        <div className="tariffs-cards">
          {/* Карточка "ЭКОНОМ" */}
          {/* Карточка "ЭКОНОМ" */}
<div className="tariff-card">
  <h3 className="tariff-name">
    ЭКОНОМ
    <img
      src="/img/piggy.png"
      alt="Piggy Bank"
      className="tariff-icon"
    />
  </h3>
  <p className="tariff-price">10 990₸</p>
  <ul className="tariff-details">
    <li>Срок обучения: 1 месяц</li>
    <li>Обучение с лучшими инструкторами</li>
  </ul>
  <button className="tariff-btn">Выбрать</button>
</div>

{/* Карточка "VIP" */}
<div className="tariff-card">
  <h3 className="tariff-name">
    VIP
    <img
      src="/img/da.png"
      alt="Diamond"
      className="tariff-icon"
    />
  </h3>
  <p className="tariff-price">10 990₸</p>
  <ul className="tariff-details">
    <li>Срок обучения: 1 месяц</li>
    <li>Индивидуальный план занятий</li>
  </ul>
  <button className="tariff-btn">Выбрать</button>
</div>

{/* Карточка "ROYAL" */}
<div className="tariff-card">
  <h3 className="tariff-name">
    ROYAL
    <img
      src="/img/cra.png"
      alt="Crown"
      className="tariff-icon"
    />
  </h3>
  <p className="tariff-price">10 990₸</p>
  <ul className="tariff-details">
    <li>Срок обучения: 1 месяц</li>
    <li>Персональный инструктор</li>
  </ul>
  <button className="tariff-btn">Выбрать</button>
</div>

        </div>
      </section>
    </>
  );
};

export default Home;
