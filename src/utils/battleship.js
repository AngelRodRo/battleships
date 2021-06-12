let board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const directions = ['h', 'v'];


const getRandomArbitrary = (min, max) => Math.floor(Math.random() * (max - min) + min);
const ID = () => '_' + Math.random().toString(36).substr(2, 9);


const createParams = ({
  size,
  direction = directions[getRandomArbitrary(0, 2)],
}) => {
  const col = getRandomArbitrary(0, 10);
  const row = getRandomArbitrary(0, 10);

  const startPosition = direction === 'h'? col : row;
  const endPosition = startPosition + size;
  if (endPosition > 4) {
    return createParams({ size, direction });
  }

  return {
    col,
    row,
    startPosition,
    endPosition,
    direction,
  }
}

const createBattleship = ({
  size,
}) => {
  const id = ID();

  let col = 0;
  let row = 0;
  let startPosition = 0;
  let endPosition = size;
  let direction = 'h';

  while (board[row][col]) {
    ({ col, row, startPosition, endPosition, direction } = createParams({ size }));
  }

  let positions = [];

  while (startPosition < endPosition) {
    const value = direction === 'h'? board[row][startPosition] : board[startPosition][col];
    if (!value) {
      positions.push(startPosition);
      startPosition++;
    } else {
      positions = [];
      if (direction === 'h') {
        col = startPosition;
      } else {
        row = startPosition;
      }
      while (board[row][col]) {
        ({ row, col, startPosition, endPosition, direction } = createParams({ size }));
      }
    }
  }

  let positionsDictionary = {}

  for (let i = 0; i < positions.length; i++) {
    const element = positions[i];
    if (direction === 'h') {
      board[row][element] = 1;
    } else {
      board[element][col] = 1;
    }
    positionsDictionary = {
      ...positionsDictionary,
      [direction === 'h'?  `${row}${element}` : `${element}${col}`]: id,
    }
  }

  return {
    id,
    positions: positionsDictionary,
  };
}

const generateBattleShipsOnBoard = () => {
  let battleships = [];
  let battleshipPositionMap = {};
  const constraints = [
    [1, 4],
    [2, 3],
    [3, 2],
    [4, 1],
  ];

  constraints.forEach(([qt, size]) => {
    for (let i = 0; i < qt; i++) {
      battleships.push(createBattleship({ size }));
    }
  })

  battleships.forEach(({ positions }) => {
    battleshipPositionMap = {
      ...battleshipPositionMap,
      ...positions,
    }
  });

  return board;
}

console.log(generateBattleShipsOnBoard())
