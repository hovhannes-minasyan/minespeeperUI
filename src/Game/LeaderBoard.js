import { useEffect, useState, useCallback } from 'react';
import FetchService from '../utils/FetchService';

export default function LeaderBoard ({ user }) {
  const [mode, setMode] = useState('medium');
  const [leaders, setLeaders] = useState([]);

  const handleSelect = useCallback((e) => {
    const newMode = e.target.value;
    FetchService.get(`users/leaderboard/${newMode}`).then(res => {
      setLeaders(res.data);
    });
    setMode(newMode);
  }, []);

  useEffect(() => {
    FetchService.get(`users/leaderboard/${mode}`).then(res => {
      setLeaders(res.data);
    });
  }, [mode])

  return (<div className="game-leaderboard">
    <select className="select" value={mode} onChange={handleSelect}>
      <option value="easy"> Easy </option>
      <option value="medium"> Medium </option>
      <option value="hard"> Hard </option>
    </select>
    <table>
      <tr>
        <th>Player</th>
        <th>Best Score</th>
      </tr>
      {leaders.map((leader, i) => (
        <tr key={`${leader.id}${mode}${i}`}>
          <td>{leader.firstName} {leader.lastName}</td>
          <td>{leader.bestTimes[mode]}</td>
        </tr>
      ))}
    </table>
  </div>);
}
