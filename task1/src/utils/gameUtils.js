// Возвращает перемешанную, но решаемую доску
export const generateBoard = () => {
  let tiles;
  do {
    tiles = shuffle([...Array(15).keys(), 0]); // Массив от 0 до 15 (0 — пустая ячейка)
  } while (!isSolvable(tiles));
  return tiles;
};

// Перемешивание массива (алгоритм Фишера-Йейтса)
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Проверка, решаема ли комбинация
const isSolvable = (tiles) => {
  let inversions = 0;
  for (let i = 0; i < tiles.length; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      if (tiles[i] && tiles[j] && tiles[i] > tiles[j]) inversions++;
    }
  }
  const emptyRow = Math.floor(tiles.indexOf(0) / 4);
  return (inversions + emptyRow) % 2 === 0;
};

// Проверка, можно ли переместить фишку
export const canMove = (index, emptyIndex) => {
  const row = Math.floor(index / 4);
  const col = index % 4;
  const emptyRow = Math.floor(emptyIndex / 4);
  const emptyCol = emptyIndex % 4;
  return (
    (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
    (col === emptyCol && Math.abs(row - emptyRow) === 1)
  );
};

// Обмен фишек местами
export const swapTiles = (tiles, index1, index2) => {
  const newTiles = [...tiles];
  [newTiles[index1], newTiles[index2]] = [newTiles[index2], newTiles[index1]];
  return newTiles;
};

// Проверка, решена ли головоломка
export const isSolved = (tiles) => {
  for (let i = 0; i < 15; i++) {
    if (tiles[i] !== i + 1) return false;
  }
  return tiles[15] === 0;
};
