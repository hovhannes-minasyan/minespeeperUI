import { useEffect, useState, useCallback } from 'react';
import FetchService from '../utils/FetchService';

export default function LeaderBoard ({ user }) {
  const [mode, setMode] = useState('Easy');
  const [leaders, setLeaders] = useState([]);

  const handleSelect = useCallback(async (e) => {
    const newMode = e.target.value;
    const res = await FetchService.get(`users/leaderboard/${newMode}`)
    setLeaders(res.data);
    setMode(newMode);
  }, []);

  useEffect( async () => {
    const res = await FetchService.get(`users/leaderboard/${mode}`);
    setLeaders(res.data);
  }, [mode])

  return (<div className="game-leaderboard">
    <select className="select" value={mode} onChange={handleSelect}>
      <option value="Easy"> Easy </option>
      <option value="Medium"> Medium </option>
      <option value="Hard"> Hard </option>
    </select>
    <table>
      <thead>
      <tr>
        <th>Player</th>
        <th>Best Score</th>
      </tr>
      </thead>
      <tbody>
      {leaders.map((leader, i) => (
        <tr key={`${leader.id}${mode}${i}`} className={`${leader._id === user._id ? 'highlight-user': ''}`}>
          <td>{leader.firstName} {leader.lastName}</td>
          <td>{leader.bestTimes[mode]}</td>
        </tr>
      ))}
      </tbody>
    </table>
  </div>);
}
