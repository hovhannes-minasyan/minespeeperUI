import './index.css';
import { useCallback } from 'react';

export default function Header({user, setUser}) {
  const { firstName, lastName, wonGames, totalGames } = user;
  const logOut = useCallback(() => {
    sessionStorage.setItem('token', '');
    setUser({});
  }, [setUser])

  return (<div className="game-header">
    <span>Hello {firstName} {lastName}!!! ({wonGames}/{totalGames} win)</span>
    <span className="logout" onClick={logOut}>Log out</span>
  </div>);
}
