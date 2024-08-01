type Cell = {
  board: boolean[][];
  xPosition: number;
  yPosition: number;
};

function getValue({ board, xPosition, yPosition }: Cell) {
  const width = board.length;
  const height = board[0]?.length ?? 0;

  if (!width || !height) return 0 as const;

  while (yPosition < 0) yPosition = yPosition + width;
  while (yPosition >= width) yPosition = yPosition - width;
  while (xPosition < 0) xPosition = xPosition + height;
  while (xPosition >= height) xPosition = xPosition - height;

  return board[yPosition]?.[xPosition] ? (1 as const) : (0 as const);
}

function countSurrounding({ board, xPosition, yPosition }: Cell) {
  return (
    getValue({ board, xPosition: xPosition - 1, yPosition: yPosition - 1 }) +
    getValue({ board, xPosition: xPosition - 1, yPosition: yPosition }) +
    getValue({ board, xPosition: xPosition - 1, yPosition: yPosition + 1 }) +
    getValue({ board, xPosition: xPosition, yPosition: yPosition - 1 }) +
    getValue({ board, xPosition: xPosition, yPosition: yPosition + 1 }) +
    getValue({ board, xPosition: xPosition + 1, yPosition: yPosition - 1 }) +
    getValue({ board, xPosition: xPosition + 1, yPosition: yPosition }) +
    getValue({ board, xPosition: xPosition + 1, yPosition: yPosition + 1 })
  );
}

function isAlive(props: Cell) {
  const surrounding = countSurrounding(props);

  if (surrounding === 2)
    return props.board[props.yPosition]?.[props.xPosition] ?? false;

  if (surrounding === 3) return true;

  return false;
}

export function evaluateNewBoard(board: boolean[][]) {
  return board.map((line, yPosition) =>
    line.map((cell, xPosition) => isAlive({ board, xPosition, yPosition })),
  );
}

export function areBoardsIdentical(board1: boolean[][], board2: boolean[][]) {
  if (board1.length !== board2.length) return false;
  if (board1[0]?.length !== board2[0]?.length) return false;

  const isDifferent = board1.some((line, yPosition) =>
    line.some((cell, xPosition) => board2[yPosition]?.[xPosition] !== cell),
  );

  return !isDifferent;
}
