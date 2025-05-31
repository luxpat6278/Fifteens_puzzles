// 📁 src/components/LeaderboardModal/LeaderboardModal.jsx
import React, { useEffect, useState } from 'react';
import './LeaderboardModal.css';

/**
 * Props:
 *  - isOpen: boolean — показывать ли окно
 *  - onClose: function() — колбэк для закрытия
 *  - language: 'ru' | 'en' (опционально, чтобы менять заголовки)
 */
const LeaderboardModal = ({ isOpen, onClose, language }) => {
  const [leaders, setLeaders] = useState([]);

  // При открытии читаем массив из localStorage
  useEffect(() => {
    if (!isOpen) return;

    const stored = localStorage.getItem('pjatnashki_leaders');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setLeaders(parsed);
        }
      } catch (e) {
        console.error('Ошибка парсинга localStorage pjatnashki_leaders:', e);
        setLeaders([]);
      }
    } else {
      setLeaders([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="leaderboard-overlay">
      <div className="leaderboard-modal">
        <h2>
          {language === 'ru' ? 'Таблица лидеров' : 'Leaderboard'}
        </h2>
        {leaders.length === 0 ? (
          <p>{language === 'ru' ? 'Нет записей.' : 'No records.'}</p>
        ) : (
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>#</th>
                <th>{language === 'ru' ? 'Имя' : 'Name'}</th>
                <th>{language === 'ru' ? 'Ходы' : 'Moves'}</th>
                <th>{language === 'ru' ? 'Время' : 'Time'}</th>
                <th>{language === 'ru' ? 'Дата' : 'Date'}</th>
              </tr>
            </thead>
            <tbody>
              {leaders.map((entry, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{entry.name}</td>
                  <td>{entry.moves}</td>
                  <td>{entry.timeString}</td>
                  <td>{entry.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button className="leaderboard-close-btn" onClick={onClose}>
          {language === 'ru' ? 'Закрыть' : 'Close'}
        </button>
      </div>
    </div>
  );
};

export default LeaderboardModal;
