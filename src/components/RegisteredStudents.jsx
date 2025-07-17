import React, { useEffect, useState } from 'react';
import '../CSS/Registeredstudents.css';
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
    <div className="registered-container">
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
                <td data-label="Student ID">{registration.id}</td>
                <td data-label="Name">{registration.student.name}</td>
                <td data-label="Email">{registration.student.email}</td>
                <td data-label="Course">{registration.courseName}</td>
                <td data-label="Type">{registration.typeName}</td>
                <td data-label="Status">
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