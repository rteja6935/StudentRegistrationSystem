import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin({ onAdminLogin }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Allow login with any non-empty username and password
    if (credentials.username.trim() !== '' && credentials.password.trim() !== '') {
      localStorage.setItem('isAdminLoggedIn', 'true');
      onAdminLogin();
      navigate('/registered-students');
    } else {
      setError('Please enter both username and password');
    }
  };

  return (
    <div className="admin-login">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            placeholder="Type anything "
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Type anything"
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="submit-btn">
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
