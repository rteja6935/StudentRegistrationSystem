import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
const Container = styled.div`
  display: flex;
  height: 100vh;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftPanel = styled.div`
  flex: 1;
  background: #111;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const RightPanel = styled.div`
  flex: 1;
  background: linear-gradient(to bottom right, #a278f4, #7d5af2);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: white;
  flex-direction: column;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin: 1rem 0 0.3rem 0;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  padding: 0.8rem;
  border-radius: 5px;
  border: none;
  width: 100%;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const EyeIcon = styled.div`
  position: absolute;
  top: 30%;
  right: 10px;
  cursor: pointer;
`;

const Button = styled.button`
  background: #a278f4;
  padding: 0.9rem;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  margin-top: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #8b62d9;
  }
`;

const ForgotPassword = styled.p`
  color: gray;
  font-size: 0.9rem;
  margin-top: -10px;
  cursor: pointer;
`;

const SignUpSection = styled.div`
  margin-top: 2rem;
  font-size: 0.9rem;

  button {
    margin-left: 10px;
    background: gray;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    color: white;
  }
`;

const Illustration = styled.div`
  text-align: center;

  h1 {
    font-size: 2.2rem;
  }

  p {
    margin-top: 1rem;
    font-size: 1rem;
  }

  img {
    margin-top: 2rem;
    max-width: 100%;
  }
`;

const Select = styled.select`
  padding: 0.8rem;
  border-radius: 5px;
  border: none;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('student');
  const navigate = useNavigate(); // ✅ INITIALIZE HERE

  // ✅ Handle login submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (role === 'admin') {
      navigate('/admin-dashboard');
    } else if (role === 'student') {
      alert('Student login not implemented yet.');
    }
  };

  return (
    <Container>
      <LeftPanel>
        <h1>Login</h1>
        <p>Enter your account details</p>

        {/* ✅ ADD onSubmit HERE */}
        <Form onSubmit={handleSubmit}>
          <Label>Login As</Label>
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </Select>

          <Label>Username</Label>
          <Input type="text" placeholder="Enter username" />

          <Label>Password</Label>
          <InputGroup>
            <Input type={showPassword ? 'text' : 'password'} placeholder="Enter password" />
            <EyeIcon onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </EyeIcon>
          </InputGroup>

          <ForgotPassword>Forgot Password?</ForgotPassword>

          {/* ✅ Keep it type="submit" */}
          <Button type="submit">Login as {role === 'student' ? 'Student' : 'Admin'}</Button>
        </Form>

        <SignUpSection>
          Don’t have an account?
          <button>Sign up</button>
        </SignUpSection>
      </LeftPanel>

      <RightPanel>
        <Illustration>
          <h1>Welcome to<br />student portal</h1>
          <p>Login to access your account</p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140047.png"
            alt="Illustration"
            width="250"
          />
        </Illustration>
      </RightPanel>
    </Container>
  );
};

export default LoginPage;