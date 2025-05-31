import React from 'react';
import './Controls.css';

const Controls = ({ gameState, onStart, onPause, onResume, onExit, language, openLeaderboard }) => {
  return (
    <div className="controls">
      {gameState === 'stopped' && (
        <button onClick={onStart}>
          {language === 'ru' ? 'Начать' : 'Start'}
        </button>
      )}
      {gameState === 'started' && (
        <>
          <button onClick={onPause}>
            {language === 'ru' ? 'Пауза' : 'Pause'}
          </button>
          <button onClick={onExit}>
            {language === 'ru' ? 'Выход' : 'Exit'}
          </button>
        </>
      )}
      {gameState === 'paused' && (
        <>
          <button onClick={onResume}>
            {language === 'ru' ? 'Продолжить' : 'Resume'}
          </button>
          <button onClick={onExit}>
            {language === 'ru' ? 'Выход' : 'Exit'}
          </button>
        </>
      )}
      <button onClick={openLeaderboard}>🏆 {language === 'ru' ? 'Таблица лидеров' : 'Leaderboard'}</button>
    </div>
  );
};

export default Controls;

