import './index.css';
import {useCallback} from 'react';

export default function Header({user, setUser, quitGame}) {
  const {firstName, lastName, wonGames, totalGames} = user;
  const logOut = useCallback(() => {
    sessionStorage.setItem('token', '');
    localStorage.removeItem('gameId');
    setUser({});
  }, [setUser])

  return (<div className="game-header">
    <span>Hello {firstName} {lastName}!!! ({wonGames}/{totalGames} win)</span>
    <div>
      {!!quitGame && <button onClick={quitGame} className="quit-button"> Quit Game </button>}
      <span className="logout" onClick={logOut}>Log out</span>
    </div>
  </div>);
}
