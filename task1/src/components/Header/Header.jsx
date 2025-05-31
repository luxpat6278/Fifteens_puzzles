import React from 'react';
import './Header.css';

const Header = ({ moves, time, language, toggleLanguage }) => {
  return (
    <header className="header">
      <div className="header-section">
        <span>
          {language === 'ru' ? 'Ходы' : 'Moves'}: {moves}
        </span>
        <span>
          {language === 'ru' ? 'Время' : 'Time'}: {time}
        </span>
      </div>
      <button className="lang-btn" onClick={toggleLanguage}>
        {language === 'ru' ? 'EN' : 'RU'}
      </button>
    </header>
  );
};

export default Header;
