import { useState, useEffect } from 'react';
import { generateSolvableTiles } from '../utils/generateTiles';

export const useGameLogic = () => {
  const [tiles, setTiles] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [gameState, setGameState] = useState('stopped');
  const [showVictory, setShowVictory] = useState(false);

  useEffect(() => {
    let timer;
    if (gameState === 'started') {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState]);

  const startGame = () => {
    const newTiles = generateSolvableTiles();
    setTiles(newTiles);
    setMoves(0);
    setTime(0);
    setShowVictory(false);
    setGameState('started');
  };

  const pauseGame = () => setGameState('paused');
  const resumeGame = () => setGameState('started');
  const exitGame = () => {
    setTiles([]);
    setMoves(0);
    setTime(0);
    setShowVictory(false);
    setGameState('stopped');
  };

  const checkVictory = (arr) => {
    for (let i = 0; i < 15; i++) {
      if (arr[i] !== i + 1) return false;
    }
    return arr[15] === 0;
  };

  const moveTile = (index) => {
    if (gameState !== 'started') return;
    if (tiles[index] === 0) return;
    const emptyIndex = tiles.indexOf(0);
    const validMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - 4, emptyIndex + 4];

    if (
      (index === emptyIndex - 1 && emptyIndex % 4 === 0) ||
      (index === emptyIndex + 1 && index % 4 === 0)
    ) return;

    if (validMoves.includes(index)) {
      const newTiles = [...tiles];
      [newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]];
      setTiles(newTiles);
      setMoves((prev) => prev + 1);
      if (checkVictory(newTiles)) {
        setGameState('stopped');
        setShowVictory(true);
      }
    }
  };

  return {
    tiles,
    moves,
    time,
    gameState,
    showVictory,
    startGame,
    pauseGame,
    resumeGame,
    exitGame,
    moveTile,
  };
};
