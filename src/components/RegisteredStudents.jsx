import React, { useEffect, useState } from 'react';

function RegisteredStudents() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem('registrations') || '[]');
      setRegistrations(data);
    } catch (error) {
      console.error('Error parsing registrations from localStorage:', error);
      setRegistrations([]);
    }
  }, []);

  return (
    <div>
      <h2>Student Registered Details</h2>
      {registrations.length === 0 ? (
        <p>No students registered yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((registration) => registration && registration.student ? (
              <tr key={registration.id}>
                <td>{registration.id}</td>
                <td>{registration.student.name}</td>
                <td>{registration.student.email}</td>
                <td>{registration.courseName}</td>
                <td>{registration.typeName}</td>
                <td>
                  <span className={`status-badge ${registration.status.toLowerCase()}`}>
                    {registration.status}
                  </span>
                </td>
              </tr>
            ) : null)}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RegisteredStudents;