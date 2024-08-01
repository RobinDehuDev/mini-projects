"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Board(props: { board: boolean[][] }) {
  const [board, setBoard] = useState(props.board);
  const [previusBoard, setPreviusBoard] = useState(props.board);
  const [canUpdate, setUpdate] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center gap-5 bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <section className="flex w-1/2 flex-col gap-2.5">
        <h1 className="self-center text-6xl font-bold">Jeu de la vie</h1>
        <div className="bg- flex w-full gap-2.5">
          <div className="ml-auto flex flex-col gap-2.5">
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
        </div>
      </section>
      <section className="flex flex-col gap-1">
        {board.map((line, yPosition) => (
          <div className="flex gap-1">
            {line.map((cell, xPosition) => (
              <Cell
                value={cell}
                canUpdate={canUpdate}
                update={() => {
                  console.log("click", yPosition, xPosition);
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

function logBoard(board: boolean[][]) {
  board.forEach((line) => {
    console.log(line);
  });
}
