import './index.css';
import {useState, useMemo, useCallback} from 'react';
import Header from "./Header";
import Mode from "./Mode";
import Board from './Board';
import FetchService from "../utils/FetchService";
import {CLOSED} from "../utils/constants";

export default function Game({user, setUser}) {
  const [matrix, setMatrix] = useState([]);
  const [mineCount, setMineCount] = useState(0);
  const [mode, setMode] = useState();
  const modes = useMemo(() => ['Easy', 'Medium', 'Hard'], []);
  const gameId = localStorage.getItem('gameId');

  const chooseMode = useCallback(async (i) => {
    setMode(i);
    const data = await FetchService.post('games', {
      difficulty: modes[i],
    });
    const [height, width] = data.data.dimentions;
    setMineCount(data.data.mineCount);
    localStorage.setItem('gameId', data.data.id);
    const newMatrix = [];
    for (let i = 0; i < height; i++) {
      newMatrix.push([]);
      for (let j = 0; j < width; j++) {
        newMatrix[i][j] = CLOSED;
      }
    }
    setMatrix(newMatrix);
  }, [modes, setMatrix, setMineCount]);

  const restart = useCallback(() => {
    chooseMode(mode);
  }, [chooseMode, mode]);

  const quit = useCallback(async () => {
    setMatrix([]);
    const resp = await FetchService.get("users");
    setUser(resp.data)
    localStorage.removeItem('gameId');
  }, [user, setUser]);

  return (
    <div className="game-wrapper">
      <Header user={user} setUser={setUser} quitGame={matrix.length ? quit : null}/>
      {
        matrix.length ?
          (<Board matrix={matrix} restart={restart} setMatrix={setMatrix} mineCount={mineCount}/>)
          :
          (<Mode user={user} chooseMode={chooseMode} modes={modes} setMineCount={setMineCount}/>)
      }
    </div>)
}
