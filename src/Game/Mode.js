import './index.css';
import LeaderBoard from "./LeaderBoard";

export default function Mode({user, modes, chooseMode, setMineCount}) {
  if (!user || !user.bestTimes) return null;
  return (
    <div className="game-mode-container">
      <table className="game-mode-wrapper">
        <thead>
        <tr>
          <th>Mode</th>
          <th>Your Best Time</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {
          modes.map((mode, i) => (<tr key={mode+i}>
              <td>{mode}</td>
              <td>{user.bestTimes[mode]}</td>
              <td>
                <button className="game-mode" onClick={() => chooseMode(mode)}>Play!</button>
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>
      <LeaderBoard user={user}/>
    </div>);
}
