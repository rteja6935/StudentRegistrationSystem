import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import './App.css';
import AddCourse from './components/AddCourse';
import AddCourseTypes from './components/AddCourseTypes';
import CourseOffering from './components/CourseOffering';
import RegisteredStudents from './components/RegisteredStudents';
import ShowAllCourse from './components/ShowAllCourse';
import StudentCourseRegistration from './components/StudentCourseRegistration';
import Adminlogin from './components/Adminlogin';
import StudentLogin from './components/Studentlogin';

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const admin = localStorage.getItem('isAdminLoggedIn') === 'true';
    const student = localStorage.getItem('isStudentLoggedIn') === 'true';
    setIsAdminLoggedIn(admin);
    setIsStudentLoggedIn(student);
  }, []);

  const handleAdminLogin = () => {
    localStorage.setItem('isAdminLoggedIn', 'true');
    setIsAdminLoggedIn(true);
    navigate('/registered-students');
  };

  const handleStudentLogin = () => {
    localStorage.setItem('isStudentLoggedIn', 'true');
    setIsStudentLoggedIn(true);
    navigate('/show-all-courses');
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    setIsAdminLoggedIn(false);
    navigate('/');
  };

  const handleStudentLogout = () => {
    localStorage.removeItem('isStudentLoggedIn');
    setIsStudentLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="App">
     <h1 className="main-heading">Student Registration System</h1>

      {/* Admin Navbar */}
      {isAdminLoggedIn && (
        <nav className="admin-navbar">
          <ul>
            <li><a href="/add-course">Add Course</a></li>
            <li><a href="/add-course-types">Add Course Types</a></li>
            <li><a href="/course-offering">Course Offering</a></li>
            <li><a href="/registered-students">Registered Students</a></li>
            <li><button onClick={handleAdminLogout}>Logout</button></li>
          </ul>
        </nav>
      )}

      {/* Student Navbar */}
      {isStudentLoggedIn && !isAdminLoggedIn && (
        <div className="student-navbar">
          <button className="logout-btn" onClick={handleStudentLogout}>Logout</button>
        </div>
      )}

      <Routes>
        {/* Default Home Route: Login Screen */}
        {!isAdminLoggedIn && !isStudentLoggedIn && (
          <Route
            path="/"
            element={
              <div className="login-screen">
                <div className="login-form-container">
                  <h2>Admin Login</h2>
                  <Adminlogin onAdminLogin={handleAdminLogin} />
                </div>
                <div className="login-form-container">
                  <h2>Student Login</h2>
                  <StudentLogin onStudentLogin={handleStudentLogin} />
                </div>
              </div>
            }
          />
        )}

        {/* Admin Routes */}
        {isAdminLoggedIn && (
          <>
            <Route path="/add-course" element={<AddCourse />} />
            <Route path="/add-course-types" element={<AddCourseTypes />} />
            <Route path="/course-offering" element={<CourseOffering />} />
            <Route path="/registered-students" element={<RegisteredStudents />} />
          </>
        )}

        {/* Student Routes */}
        {isStudentLoggedIn && (
          <>
            <Route path="/show-all-courses" element={<ShowAllCourse />} />
            <Route path="/student-course-registration" element={<StudentCourseRegistration />} />
          </>
        )}

        {/* Fallback Route */}
        <Route path="*" element={<div>Unauthorized or Invalid Route</div>} />
      </Routes>
    </div>
  );
}

export default App;
