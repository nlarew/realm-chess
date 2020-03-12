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
} from "./ChessPiece";
import { ChessPieceProps } from "./ChessPiece";

export type RankID = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
export type FileID = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
export type PlayerColor = "black" | "white";
interface Cell {
  id: string;
  rank: RankID;
  file: FileID;
  color: PlayerColor;
}
const CELLS: Array<Cell> = new Array(64).fill(0).map((_, index) => {
  const file = String.fromCharCode(65 + index / 8) as FileID;
  const isOddRank = file.charCodeAt(0) % 2 === 1;
  const rank = String(1 + (index % 8)) as RankID;
  const isOddFile = Number(rank) % 2 === 1;
  return {
    id: `${file}${rank}`,
    file,
    rank,
    color: !xor(isOddFile, isOddRank) ? "black" : "white",
  };
});

const BOARD_HEIGHT = 800;
const BOARD_WIDTH = 800;

function useChessPieces(initialPieces = []) {
  const [pieces, setPieces] = React.useState(initialPieces);
  return pieces;
}

type ChessBoardProps = {
  initialPieces: Array<ChessPieceProps>;
};
export default function ChessBoard({ initialPieces = [] }: ChessBoardProps) {
  const pieces = useChessPieces(initialPieces);
  return (
    <ChessBoard.Layout>
      {CELLS.map(cell => (
        <ChessBoard.Cell key={cell.id} cell={cell}>
          <ChessBoard.CellLabel>{cell.id}</ChessBoard.CellLabel>
          {pieces
            .map(piece => {
              console.log(
                `piece.cell_id (${piece.cell_id}) === cell.id (${cell.id})`,
                piece.cell_id === cell.id,
              );
              return piece;
            })
            .filter(piece => piece.cell_id === cell.id)
            .map(piece => (
              <ChessPiece type={piece.type} color={piece.color} />
            ))}
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
