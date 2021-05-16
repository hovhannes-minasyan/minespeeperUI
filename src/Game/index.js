import './index.css';
import { useState } from 'react';
import Header from "./Header";
import Mode from "./Mode";
import Board from './Board';

export default function Game({ user, setUser }) {
  const [matrix, setMatrix] = useState([]);
  return (
    <div className="game-wrapper">
      <Header user={user} setUser={setUser}/>
      {
        matrix.length ? <Board matrix={matrix}/> : <Mode user={user} setMatrix={setMatrix}/>
      }
    </div>)
}
