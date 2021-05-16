import './index.css';
import { useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FetchService from "../utils/FetchService";

export default function Login({setUser}) {
  const [userData, setUserData] = useState({});
  const history = useHistory();

  const handleChange = useCallback((e, fieldName) => {
    setUserData(prev => ({...prev, [fieldName]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const { data: { token } }  = await FetchService.post('auth/login', userData);
    sessionStorage.setItem('token', token);
    // change
    setUser({
      firstName: "AAA",
      id: "609bd8435a25e942c850f6ae",
      lastName: "LastName",
      username: "someone",
    });
    history.push('/game');
  }, [history, setUser, userData]);

  return (<div className="auth-container">
      <div className="auth-content">
        <form className="auth-form">
          <input
            type="text"
            className="auth-field"
            name="username"
            placeholder="username"
            onChange={(e) => handleChange(e,'username')}
          />
          <input
            type="password"
            className="auth-field"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e,'password')}
          />
          <button className="auth-submit" onClick={handleSubmit}> Log in </button>
        </form>
        <span> Don't have an account? <Link className="auth-link" to="/register"> Register </Link></span>
      </div>
    </div>
  )
}
