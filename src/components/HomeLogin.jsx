import { useNavigate } from 'react-router-dom';

function HomeLogin() {
  const navigate = useNavigate();

  return (
    <div className="home-login">
      <h2>Welcome</h2>
      <button onClick={() => navigate('/admin-login')}>Admin Login</button>
      <button onClick={() => navigate('/student-login')}>Student Login</button>
    </div>
  );
}

export default HomeLogin;
