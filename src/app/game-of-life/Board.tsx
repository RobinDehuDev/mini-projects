"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { areBoardsIdentical, evaluateNewBoard } from "./game";

export default function Board(props: { board: boolean[][] }) {
  const [cycleNumber, setCycleNumber] = useState(0);
  const [isRuning, setIsRuning] = useState(false);
  const [board, setBoard] = useState(props.board);
  const [previusBoard, setPreviusBoard] = useState(props.board);
  const [canUpdate, setUpdate] = useState(false);

  function run() {
    if (!isRuning) return undefined;

    setCycleNumber(cycleNumber + 1);
    const newboard = evaluateNewBoard(board);
    const identical = areBoardsIdentical(board, newboard);
    if (identical) {
      setIsRuning(false);
      return undefined;
    }

    setBoard(newboard);
  }

  useEffect(() => {
    if (!canUpdate && isRuning) {
      setTimeout(() => run(), 40);
    }
  }, [isRuning, canUpdate, board]);

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <section className="flex flex-col gap-10 pt-2">
        {/* header */}
        <h1 className="self-center text-6xl font-bold">Jeu de la vie</h1>
        {/* controls */}
        <section className="bg- flex w-full">
          <div className="flex flex-1">Nombre de cycles : {cycleNumber}</div>
          <div className="flex-1">
            <button
              disabled={canUpdate}
              className={twMerge(
                canUpdate ? "opacity-90" : "",
                "w-24 rounded-lg bg-slate-300 px-2 py-0.5 font-medium text-slate-800",
              )}
              onMouseDown={() => {
                if (isRuning) {
                  setIsRuning(false);
                } else {
                  setIsRuning(true);
                }
              }}
            >
              {isRuning ? "Arrêter" : "Démarrer"}
            </button>
          </div>
          <div className="flex flex-col gap-2.5">
            <button
              className="w-24 rounded-lg bg-slate-300 px-2 py-0.5 font-medium text-slate-800"
              onMouseDown={() => {
                if (!canUpdate) {
                  setPreviusBoard(board);
                }
                setUpdate(!canUpdate);
              }}
            >
              {canUpdate ? "Jouer" : "Modifier"}
            </button>
            <button
              disabled={!canUpdate}
              className={twMerge(
                canUpdate ? "" : "opacity-90",
                "w-24 rounded-lg bg-slate-300 px-2 py-0.5 font-medium text-slate-800",
              )}
              onMouseDown={() => {
                setBoard(previusBoard);
                setUpdate(!canUpdate);
              }}
            >
              Annuler
            </button>
          </div>
        </section>
        {/* board */}
        <section className="flex flex-col gap-1">
          {board.map((line, yPosition) => (
            <div key={`line${yPosition}`} className="flex gap-1">
              {line.map((cell, xPosition) => (
                <Cell
                  key={`cell${yPosition}-${xPosition}`}
                  value={cell}
                  canUpdate={canUpdate}
                  update={() => {
                    const newBoard = [...board];

                    newBoard[yPosition] = board[yPosition]
                      ? [...board[yPosition]]
                      : [];
                    newBoard[yPosition][xPosition] = !cell;

                    //   logBoard(newBoard);

                    setBoard(newBoard);
                  }}
                />
              ))}
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}

function Cell(props: {
  value: boolean;
  canUpdate: boolean;
  update: () => void;
}) {
  return (
    <button
      disabled={!props.canUpdate}
      className={twMerge(props.value ? "bg-black" : "bg-white", "h-10 w-10")}
      onMouseDown={props.update}
    />
  );
}
