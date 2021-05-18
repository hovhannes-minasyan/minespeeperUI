import './App.css';
import {useState, useEffect} from 'react';
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import {BrowserRouter, Redirect, Switch, Route} from "react-router-dom";
import Game from "./Game";
import FetchService from './utils/FetchService';

function App() {
  const [user, setUser] = useState({});
  const isLoggedIn = !!sessionStorage.getItem('token');

  useEffect(() => {
    if (!isLoggedIn) return;
    FetchService.get('users').then(res => {
      setUser(res.data);
    }).catch(() => sessionStorage.removeItem('token'));
  }, [isLoggedIn])


  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            {isLoggedIn ? <Redirect to="/game"/> : <Login setUser={setUser}/>}
          </Route>
          <Route path="/register">
            {isLoggedIn ? <Redirect to="/game"/> : <Register setUser={setUser}/>}
          </Route>
          <Route path="/game">
            {isLoggedIn ? <Game user={user} setUser={setUser}/> : <Redirect to="/login"/>}
          </Route>
          <Route path="/">
            <Redirect to="/game"/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
