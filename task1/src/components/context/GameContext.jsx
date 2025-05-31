// 📁 src/context/GameContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { generateBoard, canMove, swapTiles, isSolved } from '../../utils/gameUtils';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [tiles, setTiles] = useState(generateBoard());
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showVictory, setShowVictory] = useState(false);

  // Таймер
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  // Обработка движения
  const moveTile = (index) => {
    const emptyIndex = tiles.indexOf(0);
    if (!canMove(index, emptyIndex)) return;

    const newTiles = swapTiles(tiles, index, emptyIndex);
    setTiles(newTiles);
    setMoves((m) => m + 1);

    if (isSolved(newTiles)) {
      setIsRunning(false);
      setShowVictory(true);
    }
  };

  const resetGame = () => {
    setTiles(generateBoard());
    setMoves(0);
    setTime(0);
    setIsRunning(true);
    setShowVictory(false);
  };

  return (
    <GameContext.Provider
      value={{
        tiles,
        moves,
        time,
        isRunning,
        showVictory,
        moveTile,
        resetGame,
        setShowVictory,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
