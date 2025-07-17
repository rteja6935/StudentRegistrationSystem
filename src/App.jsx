import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import CourseTypes from './components/CourseTypes';
import Course from './components/Course';
import AdminLayout from './components/AdminLayout';
import CourseOffering from './components/CourseOffering';
import RegisteredStudents from './components/RegisteredStudents';
import ShowAllCourse from './components/ShowAllCourse';
function App() {
  return (
    <Routes>
      {/* Login page - no navbar */}
      <Route path="/" element={<LoginPage />} />

      {/* Admin pages - with fixed navbar */}
      <Route
        path="/admin-dashboard"
        element={
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        }
      />
      <Route
        path="/admin-dashboard/course"
        element={
          <AdminLayout>
            <Course />
          </AdminLayout>
        }
      />
      <Route
        path="/admin-dashboard/course-types"
        element={
          <AdminLayout>
            <CourseTypes />
          </AdminLayout>
        }
      />
      <Route
        path="/admin-dashboard/course-offering"
        element={
          <AdminLayout>
            <CourseOffering />
          </AdminLayout>
        }
      />
        <Route
        path="/admin-dashboard/registered-students"
        element={
          <AdminLayout>
            <RegisteredStudents />
          </AdminLayout>
        }
      />
      <Route path="/student-dashboard" element={<ShowAllCourse />} />
    </Routes>
  );
}

export default App;




// import React, { useState, useEffect } from 'react';
// import { Route, Routes, useNavigate } from 'react-router-dom';

// import './App.css';
// import AddCourse from './components/AddCourse';
// import AddCourseTypes from './components/AddCourseTypes';
// import CourseOffering from './components/CourseOffering';
// import RegisteredStudents from './components/RegisteredStudents';
// import ShowAllCourse from './components/ShowAllCourse';
// import StudentCourseRegistration from './components/StudentCourseRegistration';
// import Adminlogin from './components/Adminlogin';
// import StudentLogin from './components/StudentLogin';

// function App() {
//   const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
//   const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const admin = localStorage.getItem('isAdminLoggedIn') === 'true';
//     const student = localStorage.getItem('isStudentLoggedIn') === 'true';
//     setIsAdminLoggedIn(admin);
//     setIsStudentLoggedIn(student);
//   }, []);

//   const handleAdminLogin = () => {
//     localStorage.setItem('isAdminLoggedIn', 'true');
//     setIsAdminLoggedIn(true);
//     navigate('/registered-students');
//   };

//   const handleStudentLogin = () => {
//     localStorage.setItem('isStudentLoggedIn', 'true');
//     setIsStudentLoggedIn(true);
//     navigate('/show-all-courses');
//   };

//   const handleAdminLogout = () => {
//     localStorage.removeItem('isAdminLoggedIn');
//     setIsAdminLoggedIn(false);
//     navigate('/');
//   };

//   const handleStudentLogout = () => {
//     localStorage.removeItem('isStudentLoggedIn');
//     setIsStudentLoggedIn(false);
//     navigate('/');
//   };

//   return (
//     <div className="App">
//       {/* Admin Navbar */}
//       {isAdminLoggedIn && (
//         <nav className="admin-navbar">
//           <ul>
//             <li><a href="/add-course">Add Course</a></li>
//             <li><a href="/add-course-types">Add Course Types</a></li>
//             <li><a href="/course-offering">Course Offering</a></li>
//             <li><a href="/registered-students">Registered Students</a></li>
//             <li><button onClick={handleAdminLogout}>Logout</button></li>
//           </ul>
//         </nav>
//       )}

//       {/* Student Navbar */}
//       {isStudentLoggedIn && !isAdminLoggedIn && (
//         <nav className="student-navbar">
//           <ul>
//             <li><button className="logout-btn" onClick={handleStudentLogout}>Logout</button></li>
//           </ul>
//         </nav>
//       )}

//       {/* Show Heading Only on Login */}
//       {!isAdminLoggedIn && !isStudentLoggedIn && (
//        <div className="info-section">
//   <h2>Welcome to the Student Registration System</h2>
//   <p>
//     This platform allows students to register for courses and administrators to manage course offerings efficiently. Log in to explore available courses or manage the system.
//   </p>
// </div>
//       )}

//       {/* Main Content */}
//       <div className="main-content">
//         <Routes>
//           {/* Default Home Route: Login Screen */}
//           {!isAdminLoggedIn && !isStudentLoggedIn && (
//             <Route
//               path="/"
//               element={
//                 <div className="login-screen">
//                   <div className="login-form-container">
//                     <h2>Admin Login</h2>
//                     <Adminlogin onAdminLogin={handleAdminLogin} />
//                   </div>
//                   <div className="login-form-container">
//                     <h2>Student Login</h2>
//                     <StudentLogin onStudentLogin={handleStudentLogin} />
//                   </div>
//                 </div>
//               }
//             />
//           )}

//           {/* Admin Routes */}
//           {isAdminLoggedIn && (
//             <>
//               <Route path="/add-course" element={<AddCourse />} />
//               <Route path="/add-course-types" element={<AddCourseTypes />} />
//               <Route path="/course-offering" element={<CourseOffering />} />
//               <Route path="/registered-students" element={<RegisteredStudents />} />
//             </>
//           )}

//           {/* Student Routes */}
//           {isStudentLoggedIn && (
//             <>
//               <Route path="/show-all-courses" element={<ShowAllCourse />} />
//               <Route path="/student-course-registration" element={<StudentCourseRegistration />} />
//             </>
//           )}

//           {/* Fallback Route */}
//           <Route path="*" element={<div>Unauthorized or Invalid Route</div>} />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default App;
