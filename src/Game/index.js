import './index.css';
import {useState, useMemo, useCallback, useEffect} from 'react';
import Header from "./Header";
import Mode from "./Mode";
import Board from './Board';
import FetchService from "../utils/FetchService";
import copyMatrix from "../utils/copyMatrix";
import {CLOSED} from "../utils/constants";

export default function Game({user, setUser}) {
  const [matrix, setMatrix] = useState([]);
  const [mineCount, setMineCount] = useState(0);
  const [timerValue, setTimerValue] = useState(0);
  const [mode, setMode] = useState();
  const modes = useMemo(() => ['Easy', 'Medium', 'Hard'], []);
  const gameId = localStorage.getItem('gameId');

  useEffect(async () => {
    if(gameId){
      const { data } =  await FetchService.get(`games/${gameId}`)
      let newMatrix = []
      for (let i = 0; i < data.dimentions[0]; i++) {
        newMatrix.push([]);
        for (let j = 0; j < data.dimentions[1]; j++) {
            newMatrix[i][j] = CLOSED;
        }
      }
      setCellArray(newMatrix, data.Cells)
      setMineCount(data.mineCount)
      setTimerValue(Math.floor((Date.now() - data.startTimeStamp)/1000))
    }
  }, [])

  const setCellArray = useCallback((matrix, cellArray) => {
    const newMatrix = copyMatrix(matrix);
    for(let cell of cellArray){
      const [i,j] = cell.Cell;
      newMatrix[i][j] = cell.Value;
    }
    setMatrix(newMatrix);
  }, []);
  
  const chooseMode = useCallback(async (mode) => {
    setMode(mode);
    localStorage.setItem('mode', mode)
    const { data } = await FetchService.post('games', {
      difficulty: mode,
    });
    const [height, width] = data.dimentions;
    setMineCount(data.mineCount);
    localStorage.setItem('gameId', data.id);
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
    chooseMode(localStorage.getItem('mode'));
    setTimerValue(0);
  }, [chooseMode]);

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
          (<Board matrix={matrix} restart={restart} setMatrix={setMatrix} mineCount={mineCount} initialTime={timerValue}/>)
          :
          (<Mode user={user} chooseMode={chooseMode} modes={modes} setMineCount={setMineCount}/>)
      }
    </div>)
}
