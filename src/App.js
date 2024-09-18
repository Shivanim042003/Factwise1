
import React,{useState} from 'react'
import './App.css';
const calculateWinner=(squares)=>{
  const lines=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for(let i=0;i<lines.length;i++){
    const[a,b,c]=lines[i];
    if(squares[a]&&squares[a]===squares[b]&& squares[a]===squares[c]){
      return squares[a];
    }
  }
  return null;
};

const Square=({value,onClick})=>(
  <button className='square' onClick={onClick}>{value}</button>
);

const Board=({squares,onClick})=>(
  <div>
    {[0,1,2].map((row)=>(
      <div key={row} className='board-row'>
          {[0,1,2].map((col)=>(
            <Square
             key={row*3+col}
            value={squares[row*3+col]}
            onClick={()=>onClick(row*3+col)}
          />
        ))}
      </div>
    ))}
  </div>
);
const App=()=> {
  const[history,setHistory]=useState([{squares:Array(9).fill(null)}]);
  const[xIsNext,setXIsNext]=useState(true);
  const [stepNumber,setStepNumber]=useState(0);
  
  const handleClick =(i)=>{
    const historyCopy=history.slice(0,stepNumber+1);
    const currrent = historyCopy[historyCopy.length-1];
    const squares =currrent.squares.slice();

    if(calculateWinner(squares)||squares[i]) return;

    squares[i]=xIsNext?'x':'0';
    setHistory(historyCopy.concat([{squares}]));
    setXIsNext(!xIsNext);
    setStepNumber(historyCopy.length);
  };

  const jumpTo=(step)=>{
    setStepNumber(step);
    setXIsNext(step%2===0)
  };

  const current=history[stepNumber];
  const winner= calculateWinner(current.squares);
  const status =winner?`winner:${winner}`:`Next player:${xIsNext?'X':'0'}`;
  return (
    <div className='game'>
      <div className='game-board'>
        <Board squares={current.squares} onClick={handleClick}/>
      </div>
      <div className='game-info'>
        <div>{status}</div>
        <ol>{history.map((_,move)=>(
          <li key={move}>
            <button onClick={()=>jumpTo(move)}>{move?`Go to move #${move}`:`Go to game start`}</button>
          </li>
        ))}
          </ol>
      </div>
       
    </div>
  );
};

export default App;
