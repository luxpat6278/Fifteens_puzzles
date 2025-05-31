// 📁 src/components/VictoryModal/VictoryModal.jsx
import React, { useState } from 'react';
import './VictoryModal.css';

/**
 * Props:
 *  - isOpen: boolean (показывать ли окно)
 *  - onSave: функция(result) → вызывается, когда пользователь ввёл имя и нажал "Сохранить"
 *      result = { name: string, moves: number, timeString: string, date: string }
 *  - onClose: функция() → вызывается, когда пользователь нажал "Закрыть" (не сохранять)
 *  - moves: число ходов
 *  - time: секунд (число)
 */
const VictoryModal = ({ isOpen, onSave, onClose, moves, time }) => {
  const [name, setName] = useState('');

  if (!isOpen) return null;

  // Преобразует секунды в строку «мм:сс»
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    const mm = m < 10 ? `0${m}` : m;
    const ss = s < 10 ? `0${s}` : s;
    return `${mm}:${ss}`;
  };

  const timeString = formatTime(time);
  const today = new Date();
  const dateString = today.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  // Когда нажали "Сохранить в таблицу лидеров"
  const handleSave = () => {
    const trimmed = name.trim();
    if (trimmed.length < 1) {
      alert('Пожалуйста, введите имя (минимум 1 символ).');
      return;
    }
    // Собираем объект результата
    const result = {
      name: trimmed,
      moves,
      timeString,
      date: dateString,
    };
    onSave(result);
    // Сброс input
    setName('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>🎉 Победа!</h2>
        <p>
          Ходов: <strong>{moves}</strong>
        </p>
        <p>
          Время: <strong>{timeString}</strong>
        </p>

        <div className="input-group">
          <label htmlFor="player-name">Ваше имя:</label>
          <input
            type="text"
            id="player-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={20}
            placeholder="Введите имя"
          />
        </div>

        <div className="buttons">
          <button className="save-btn" onClick={handleSave}>
            Сохранить
          </button>
          <button className="close-btn" onClick={onClose}>
            Закрыть без сохранения
          </button>
        </div>
      </div>
    </div>
  );
};

export default VictoryModal;
