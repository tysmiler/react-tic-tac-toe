import { useState, useEffect } from 'react'
import './App.css'
import winningPatterns from './winningPatterns'

function App() {
  const [boardValue, setBoardValues] = useState(() => board())
  const [player, setPlayer] = useState("X")
  const [xTurn, setXTurn] = useState(true)
  const [result, setResult] = useState({winner: "none" , state: "none"})

  useEffect(() => {
    checkWin()
    checkDraw()
    console.log(result)
  },[boardValue])

  function handleClick(id) {
    if (result.state !== "won") {
      setBoardValues((prevBoardValues) =>
        prevBoardValues.map((boardValues) => {
          if (boardValues.id === id && boardValues.value === "") {
            return {
              ...boardValues,
              value: player,
            };
          }
          return boardValues;
        })
      );
  
      setPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
      setXTurn((prevXTurn) => !prevXTurn);
    }
  }

  function checkWin() {
    winningPatterns.forEach((currentPattern) => {
      const firstPlayer = boardValue[currentPattern[0]].value;
      if (firstPlayer === "") return;
      let foundWinningPattern = true;
      currentPattern.forEach((idx) => {
        if (boardValue[idx].value !== firstPlayer) {
          foundWinningPattern = false;
        }
      });
      if (foundWinningPattern) {
        setResult({ winner: firstPlayer, state: "won" });
      }
    });
  }

  function checkDraw() {
    const isBoardFull = boardValue.every(box => box.value !== "")
    if (isBoardFull && result.state === "none") {
      setResult({winner: "none", state: "draw"})
    }  
  }

  function board() {
    const newArray = []
    for(let i = 1; i < 10; i++ ) {
      newArray.push({value: "", id: i })
    }
    return newArray
  }
  
  
  const displayBoard = boardValue.map(box => {
    return <div className='box' key={box.id} onClick={() => handleClick(box.id)}> <div className="text">{box.value}</div> </div>
  })
  
 function restartGame() {
  setBoardValues(board())
  setPlayer("X")
  setXTurn(true)
  setResult({winner: "none" , state: "none"})

 }



  return (
    <>
    <div className="title">Tic Tac Toe</div>
    <div className="board">
      {displayBoard}
    </div>
    
    {result.state === "none" && <div className="player-turn">{player}'s turn</div>}
    {result.state === "draw" && <div className="player-turn">It's a draw</div>}
    {result.state === "won" && <div className="player-turn">{player === "X" ? "O" : "X"} Won</div>}
    {result.state != "none" && <button className='restart' onClick={restartGame}>Restart Game</button>}

    </>
  )
}

export default App