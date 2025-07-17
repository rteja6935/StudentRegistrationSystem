import React from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';

const Content = styled.div`
  padding: 6rem 2rem 2rem; /* ✅ Leave space for navbar */
`;

const AdminDashboard = () => {
  return (
    <>
      <Navbar />
      <Content>
        <h2>Welcome, Admin 👋</h2>
        <p>Select an option from the navbar to begin managing your portal.</p>
      </Content>
    </>
  );
};

export default AdminDashboard;
