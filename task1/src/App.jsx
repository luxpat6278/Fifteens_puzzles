import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/header';
import Board from './components/Board/Board';
import Controls from './components/Controls/Controls';
import VictoryModal from './components/VictoryModal/VictoryModal';
import LeaderboardModal from './components/LeaderboardModal/LeaderboardModal';
import { useGameLogic } from './hooks/useGameLogic';
import { formatTime } from './utils/formatTime';

const App = () => {
  const [language, setLanguage] = useState('ru');
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  const {
    tiles, moves, time, gameState,
    showVictory, startGame, pauseGame, resumeGame, exitGame, moveTile, setShowVictory
  } = useGameLogic();

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ru' ? 'en' : 'ru'));
  };

  const handleSaveToLeaders = () => {
    // можно добавить логику сохранения
    setShowVictory(false);
  };

  const openLeaderboard = () => setIsLeaderboardOpen(true);
  const closeLeaderboard = () => setIsLeaderboardOpen(false);

  return (
    <div className="app-container">
      <Header
        moves={moves}
        time={formatTime(time)}
        language={language}
        toggleLanguage={toggleLanguage}
      />
      <Board tiles={tiles} onClick={moveTile} gameState={gameState} />
      <Controls
        gameState={gameState}
        onStart={startGame}
        onPause={pauseGame}
        onResume={resumeGame}
        onExit={exitGame}
        language={language}
        openLeaderboard={openLeaderboard}
      />
      {showVictory && (
        <VictoryModal
          isOpen={showVictory}
          onSave={handleSaveToLeaders}
          onClose={() => setShowVictory(false)}
          moves={moves}
          time={time}
        />
      )}
      {isLeaderboardOpen && (
        <LeaderboardModal
          isOpen={isLeaderboardOpen}
          onClose={closeLeaderboard}
          language={language}
        />
      )}
    </div>
  );
};

export default App;
