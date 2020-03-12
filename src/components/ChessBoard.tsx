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
export interface Cell {
  id: string;
  rank: RankID;
  file: FileID;
  color: PlayerColor;
}

const BOARD_HEIGHT = 800;
const BOARD_WIDTH = 800;
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

function useChessPieces(initialPieces: Array<ChessPieceConfiguration>) {
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
  grid-template-areas:
    "A8 B8 C8 D8 E8 F8 G8 H8"
    "A7 B7 C7 D7 E7 F7 G7 H7"
    "A6 B6 C6 D6 E6 F6 G6 H6"
    "A5 B5 C5 D5 E5 F5 G5 H5"
    "A4 B4 C4 D4 E4 F4 G4 H4"
    "A3 B3 C3 D3 E3 F3 G3 H3"
    "A2 B2 C2 D2 E2 F2 G2 H2"
    "A1 B1 C1 D1 E1 F1 G1 H1";
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
