import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../CSS/Showallcourse.css'; 
function ShowAllCourse() {
  const [offerings, setOfferings] = useState([]);
  const [registeredIds, setRegisteredIds] = useState([]);
  const [filter, setFilter] = useState('all'); // all, registered, not-registered
  const navigate = useNavigate();

  useEffect(() => {
    const savedOfferings = JSON.parse(localStorage.getItem('offerings') || '[]');
    const savedRegs = JSON.parse(localStorage.getItem('registrations') || '[]');
    setOfferings(savedOfferings);
    setRegisteredIds(savedRegs.map(r => r.courseId));
  }, []);

  const handleReg = (id) => {
    localStorage.setItem('selectedCourseId', id);
    navigate('/student-course-registration');
  };

  const filtered = offerings.filter(c => {
    const r = registeredIds.includes(c.id);
    return filter === 'all' || (filter === 'registered' && r) || (filter === 'not-registered' && !r);
  });

  return (
    <>
    <div className="navbar">
  <div className="navbar-title">Student Dashboard</div>
  <button className="logout-btn" onClick={() => navigate('/')}>Logout</button>
</div>

    <div className="registration-container">
      <div className="filter-dropdown">
        <label htmlFor="filter">Filter Courses:</label>
        <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="registered">Registered</option>
          <option value="not-registered">Not Registered</option>
        </select>
      </div>

      <table className="registration-table">
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(c => {
            const isReg = registeredIds.includes(c.id);
            return (
              <tr key={c.id}>
                <td data-label="ID">{c.id}</td>
                <td data-label="Name">{c.courseName}</td>
                <td data-label="Type">{c.typeName}</td>
                <td data-label="Status">
                  <span className={`status-badge ${isReg ? 'registered' : 'not-registered'}`}>
                    {isReg ? 'Registered' : 'Not Registered'}
                  </span>
                </td>
                <td data-label="Action">
                  <button
                    onClick={() => handleReg(c.id)}
                    disabled={isReg}
                    className={`action-btn ${isReg ? 'disabled' : ''}`}
                  >
                    {isReg ? 'Done' : 'Register Now'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default ShowAllCourse;
