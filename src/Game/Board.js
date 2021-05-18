import {useCallback, useState} from 'react';
import DigitalText from "./DigitalText";
import Timer from "./Timer";
import copyMatrix from "../utils/copyMatrix";
import {CLOSED, FLAG, MINE} from "../utils/constants";
import FetchService from '../utils/FetchService';

export default function Board({matrix, restart, mineCount, setMatrix}) {
  const [error, setError] = useState('');
  const [flagCount, setFlagCount] = useState(0);
  const [resetTimer, setResetTimer] = useState(false);
  const [gameStatus, setGameStatus] = useState('');

  const setCell = useCallback((i, j, value) => {
    const newMatrix = copyMatrix(matrix);
    newMatrix[i][j] = value;
    setMatrix(newMatrix);
  }, [matrix, setMatrix]);

  const setCellArray = useCallback((cellArray) => {
    const newMatrix = copyMatrix(matrix);
    for(let cell of cellArray){
      const [i,j] = cell.Cell;
      newMatrix[i][j] = cell.Value;
    }
    setMatrix(newMatrix);
  }, [matrix, setMatrix]);

  const handleFlag = useCallback((e, i, j) => {
    e.preventDefault();
    if (flagCount >= mineCount) return;

    if (matrix[i][j] === FLAG) {
      setCell(i, j, CLOSED);
      setFlagCount(prev => prev - 1);
      return;
    }

    if (matrix[i][j] !== CLOSED) return;

    setCell(i, j, FLAG);
    setFlagCount(prev => prev + 1);
  }, [flagCount, matrix, mineCount, setCell]);

  const handleOpen = useCallback(async (e, i, j) => {
    setError();
    if (matrix[i][j] !== CLOSED) return;
    try {
      const data = await FetchService.patch(`games/${localStorage.getItem('gameId')}`, [i, j])
      const cells = Array.from(data.data.Cells);
      setCellArray(cells);
      
      setGameStatus(data.data?.Status || '');
    } catch (err) {
      setError(err.response.data.message);
    }
  }, [matrix, setCell]);

  const handleRestart = useCallback(() => {
    setResetTimer(true);
    setFlagCount(0);
    setGameStatus('');
    restart();
  }, [restart]);

  return (
    <>
      <div className="game-container old-button">
        <div className="game-options">
          <div className="game-score">
            <DigitalText text={`${mineCount - flagCount}`.padStart(3, '0')}/>
          </div>
          <div onClick={handleRestart} className={`game-restart old-button ${gameStatus}`}/>
          <div className="game-score">
            <Timer reset={resetTimer} setReset={setResetTimer} isStopped={!!gameStatus}/>
          </div>
        </div>
        {matrix.map((item, i) => {
          return <div className="game-row" key={i * item.length}>{item.map((cell, j) => {
            let cellClass = '';
            if (cell >= 0) {
              cellClass = `open n_${cell}`;
            } else if (cell === MINE) {
              cellClass = 'mine';
            } else if (cell === FLAG) {
              cellClass = 'old-button flag';
            } else {
              cellClass = 'old-button';
            }

            return (<div
              key={j}
              className={`game-cell ${cellClass}`}
              onClick={(e) => handleOpen(e, i, j)}
              onContextMenu={(e) => handleFlag(e, i, j)}
            />)
          })}</div>
        })}
      </div>
      <p className="error-message">{error}</p>
    </>)
}
