import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import xor from "../utils/xor";
import ChessPiece, {
  King,
  Queen,
  Rook,
  Bishop,
  Knight,
  Pawn,
  ChessPieceType,
} from "./ChessPiece";
import { ChessPieceConfiguration } from "./ChessPiece";

export type RankID = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
export type FileID = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
export enum PlayerColor {
  Black = "black",
  White = "white"
}
interface Cell {
  id: string;
  rank: RankID;
  file: FileID;
  color: PlayerColor;
}
const CELLS: Array<Cell> = new Array(64).fill(0).map((_, index) => {
  const file = String.fromCharCode(65 + index / 8);
  const isOddRank = file.charCodeAt(0) % 2 === 1;
  const rank = String(1 + (index % 8));
  const isOddFile = Number(rank) % 2 === 1;
  const color = !xor(isOddFile, isOddRank) ? "black" : "white"
  return {
    id: `${file}${rank}`,
    file: file as FileID,
    rank: rank as RankID,
    color: color as PlayerColor,
  };
});

const BOARD_HEIGHT = 800;
const BOARD_WIDTH = 800;

function useChessPieces(initialPieces: Array<ChessPieceConfiguration> = []) {
  const [pieces, setPieces] = React.useState(initialPieces);
  return pieces;
}

type ChessBoardProps = {
  initialPieces: Array<ChessPieceConfiguration>;
};
export default function ChessBoard({ initialPieces = [] }: ChessBoardProps) {
  const pieces = useChessPieces(initialPieces);
  return (
    <ChessBoard.Layout>
      {CELLS.map(cell => (
        <ChessBoard.Cell key={cell.id} cell={cell}>
          <ChessBoard.CellLabel>{cell.id}</ChessBoard.CellLabel>
          {
            pieces
              .filter(piece => piece.cell_id === cell.id)
              .map(piece => (
                <ChessPiece type={piece.type} color={piece.color} />
              ))
          }
        </ChessBoard.Cell>
      ))}
    </ChessBoard.Layout>
  );
}
ChessBoard.Layout = styled.div`
  height: ${BOARD_HEIGHT}px;
  width: ${BOARD_WIDTH}px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  grid-template-areas: ${boardGridAreas()};
`;
ChessBoard.Cell = styled.div(
  (props: { cell: Cell }) => css`
    position: relative;
    background: ${props.cell.color};
    color: ${props.cell.color === "white" ? "black" : "white"};
    color: magenta;
    grid-area: ${props.cell.id};
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  `,
);
ChessBoard.CellLabel = styled.span`
  position: absolute;
  padding: 4px;
`;
function boardGridAreas() {
  const files = "ABCDEFGH".split("");
  const ranks = "12345678".split("").reverse();
  const gridAreas = [];
  for (const rank of ranks) {
    gridAreas.push(`"${files.map(f => f + rank).join(" ")}"`);
  }
  return gridAreas;
}
