import * as React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { PlayerColor } from "./ChessBoard";

export enum ChessPieceType {
  King = "king",
  Queen = "queen",
  Rook = "rook",
  Bishop = "bishop",
  Knight = "knight",
  Pawn = "pawn",
}
export interface ChessPieceProps {
  type: ChessPieceType;
  color: PlayerColor;
}
export interface ChessPieceConfiguration extends ChessPieceProps {
  cell_id: string;
}
export default function ChessPiece({ type, color }: ChessPieceProps) {
  return (
    <ChessPiece.Container>
      <ChessPiece.Sprite type={type} color={color} />
    </ChessPiece.Container>
  );
}
ChessPiece.Container = styled.div`
  margin: auto;
  color: green;
`;
type SpriteProps = {
  type: ChessPieceType;
  color: PlayerColor;
}
ChessPiece.Sprite = function({ type, color }: SpriteProps) {
  const colors = { "offwhite": "#eeeeee", "almostblack": "#111111" }
  const circleBodyColor = colors[color === "white" ? "offwhite" : "almostblack"]
  const circleTextColor = colors[color === "white" ? "almostblack" : "offwhite"]
  return (
    <svg height="100" width="100">
      <circle
        cx="50"
        cy="50"
        r="35"
        stroke="#999999"
        stroke-width="3"
        fill={circleBodyColor}
      />
      <text
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        fill={circleTextColor}
        style={{
          font: "20px sans-serif",
        }}
      >
        {type}
      </text>
    </svg>
  );
};

export function King(props: ChessPieceProps) {
  return <ChessPiece type={ChessPieceType.King} {...props} />;
}

export function Queen(props: ChessPieceProps) {
  return <ChessPiece type={ChessPieceType.Queen} {...props} />;
}

export function Rook(props: ChessPieceProps) {
  return <ChessPiece type={ChessPieceType.Rook} {...props} />;
}

export function Bishop(props: ChessPieceProps) {
  return <ChessPiece type={ChessPieceType.Bishop} {...props} />;
}

export function Knight(props: ChessPieceProps) {
  return <ChessPiece type={ChessPieceType.Knight} {...props} />;
}

export function Pawn(props: ChessPieceProps) {
  return <ChessPiece type={ChessPieceType.Pawn} {...props} />;
}
