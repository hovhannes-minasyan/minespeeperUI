import './index.css';
import { useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FetchService from "../utils/FetchService";

export default function Register() {
  const [userData, setUserData] = useState({});
  const history = useHistory();

  const handleChange = useCallback((e, fieldName) => {
    setUserData(prev => ({...prev, [fieldName]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    await FetchService.post('users', userData);
    history.push('/login');
  }, [history, userData]);

  return (<div className="auth-container">
      <div className="auth-content">
        <form className="auth-form">
          <input
            type="text"
            className="auth-field"
            name="email"
            placeholder="Email"
            onChange={(e) => handleChange(e,'email')}
          />
          <input
            type="text"
            className="auth-field"
            name="username"
            placeholder="Username"
            onChange={(e) => handleChange(e,'username')}
          />
          <input
            type="text"
            className="auth-field"
            name="firstname"
            placeholder="First Name"
            onChange={(e) => handleChange(e,'firstName')}
          />
          <input
            type="text"
            className="auth-field"
            name="lastname"
            placeholder="Last Name"
            onChange={(e) => handleChange(e,'lastName')}
          />
          <input
            type="password"
            className="auth-field"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e,'password')}
          />

          <button className="auth-submit" onClick={handleSubmit}> Register</button>
        </form>
        <span> Already have an account? <Link className="auth-link" to="/login"> Log in </Link></span>
      </div>
    </div>
  )
}
