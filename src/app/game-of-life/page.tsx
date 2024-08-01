import Board from "./Board";

export default async function GameOfLife() {
  const board = new Array(10).fill(new Array(20).fill(false));

  return <Board board={board} />;
}
