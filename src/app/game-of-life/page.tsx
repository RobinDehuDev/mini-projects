import Board from "./Board";

export default async function GameOfLife() {
  let board = new Array(10).fill([]);
  board = board.map((line) => new Array(20).fill(false));

  board[0][1] = true;
  board[1][2] = true;
  board[2][0] = true;
  board[2][1] = true;
  board[2][2] = true;

  return <Board board={board} />;
}
