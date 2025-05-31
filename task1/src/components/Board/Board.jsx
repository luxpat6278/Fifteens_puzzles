import React from 'react';
import './Board.css';

const TILE_SIZE = 80;

const Board = ({ tiles, onClick, gameState }) => {
  return (
    <div className={`board ${gameState === 'stopped' ? 'disabled' : ''}`}>
      {tiles.map((tile, index) => {
        if (tile === 0) return null;

        const row = Math.floor(index / 4);
        const col = index % 4;
        const style = {
          transform: `translate(${col * TILE_SIZE}px, ${row * TILE_SIZE}px)`,
        };

        return (
          <div
            key={tile}
            className="tile"
            style={style}
            onClick={() => onClick(index)}
          >
            {tile}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
