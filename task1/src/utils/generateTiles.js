function isSolvable(tiles) {
  const arr = tiles.filter(n => n !== 0);
  let inversions = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) inversions++;
    }
  }
  const emptyIndex = tiles.indexOf(0);
  const emptyRowFromBottom = 4 - Math.floor(emptyIndex / 4);
  return emptyRowFromBottom % 2 === 0 ? inversions % 2 === 1 : inversions % 2 === 0;
}

function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateSolvableTiles() {
  let tiles;
  do {
    tiles = shuffle([...Array(15).keys()].map(i => i + 1).concat(0));
  } while (!isSolvable(tiles));
  return tiles;
}
