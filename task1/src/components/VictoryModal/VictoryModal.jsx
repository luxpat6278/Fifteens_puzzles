import React, { useState } from 'react';
import './VictoryModal.css';

const VictoryModal = ({ isOpen, onSave, onClose, moves, time }) => {
  const [name, setName] = useState('');

  if (!isOpen) return null;

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

  const handleSave = () => {
    const trimmed = name.trim();
    if (trimmed.length < 1) {
      alert('Пожалуйста, введите имя (минимум 1 символ).');
      return;
    }
    const result = {
      name: trimmed,
      moves,
      timeString,
      date: dateString,
    };
    onSave(result);
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
