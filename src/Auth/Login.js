import './index.css';
import {useState, useCallback} from 'react';
import {Link, useHistory} from 'react-router-dom';
import FetchService from "../utils/FetchService";

export default function Login({setUser}) {
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({});
  const history = useHistory();

  const handleChange = useCallback((e, fieldName) => {
    setUserData(prev => ({...prev, [fieldName]: e.target.value}));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      const {data: {token}} = await FetchService.post('auth/login', userData);
      sessionStorage.setItem('token', token);
      const res = await FetchService.get('users');
      setUser(res.data);
      history.push('/game');
    } catch (err) {
      sessionStorage.removeItem('token');
      setError(err.response.data.message);
    }
  }, [history, setUser, userData]);

  return (<div className="auth-container">
      <div className="auth-content">
        <form className="auth-form">
          <input
            type="text"
            className="auth-field"
            name="username"
            placeholder="Username"
            onChange={(e) => handleChange(e, 'username')}
          />
          <input
            type="password"
            className="auth-field"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e, 'password')}
          />
          <button className="auth-submit" onClick={handleSubmit}> Log in</button>
        </form>
        <p className="error-message">{error}</p>
        <span> Don't have an account? <Link className="auth-link" to="/register"> Register </Link></span>
      </div>
    </div>
  )
}
