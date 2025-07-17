import React from 'react';
import Navbar from './Navbar';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  padding-top: 5rem; /* space for fixed navbar */
  min-height: 100vh;
  background-color: #f4f6f8;
`;

const AdminLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <ContentWrapper>{children}</ContentWrapper>
    </>
  );
};

export default AdminLayout;

