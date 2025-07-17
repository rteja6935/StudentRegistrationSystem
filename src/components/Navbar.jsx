import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #7d5af2;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  z-index: 999;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const NavLink = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <Nav>
      <h3>Admin Portal</h3>
      <NavLinks>
  <NavLink onClick={() => navigate('/admin-dashboard/course')}>Course</NavLink>
  <NavLink onClick={() => navigate('/admin-dashboard/course-types')}>Course Type</NavLink>
  <NavLink onClick={() => navigate('/admin-dashboard/course-offering')}>Course Offering</NavLink>
  <NavLink onClick={() => navigate('/admin-dashboard/registered-students')}>Registered Students</NavLink>
  <NavLink onClick={handleLogout}>Logout</NavLink>
</NavLinks>

    </Nav>
  );
};

export default Navbar;
