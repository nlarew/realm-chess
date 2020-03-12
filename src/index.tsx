import * as React from "react";
import { render } from "react-dom";
import ChessBoard from "./components/ChessBoard";
import DEFAULT_PIECES from "./default-pieces.json";

function App() {
  return <ChessBoard initialPieces={DEFAULT_PIECES} />;
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
