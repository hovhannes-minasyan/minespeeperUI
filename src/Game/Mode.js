import './index.css';
import {useCallback, useMemo} from 'react';
import LeaderBoard from "./LeaderBoard";
import FetchService from '../utils/FetchService';

export default function Mode({user, setMatrix}) {
  const modes = useMemo(() => ['Easy', 'Medium', 'Hard'], [])

  const chooseMode = useCallback((i) => {
    FetchService.post('games', {
      difficulty: modes[i],
    }).then((data) => {
      const [width, height] = data.data.dimentions;
      const newMatrix = [];
      for (let i = 0; i < height; i++) {
        newMatrix.push([]);
        for (let j = 0; j < width; j++) {
          newMatrix[i][j] = 0;
        }
      }
      setMatrix(newMatrix);
    })
  }, [modes, setMatrix]);

  if(!user || !user.bestTimes) return null;
  return (
    <div className="game-mode-container">
      <table className="game-mode-wrapper">
        <tr>
          <th>Mode</th>
          <th>Your Best Time</th>
          <th></th>
        </tr>
        {
          modes.map((mode, i) => (<tr>
              <td>{mode}</td>
              <td>{user.bestTimes[mode]}</td>
              <td>
                <button className="game-mode" onClick={() => chooseMode(i)}>Play!</button>
              </td>
            </tr>
          ))
        }
      </table>
      <LeaderBoard user={user}/>
    </div>);
}
