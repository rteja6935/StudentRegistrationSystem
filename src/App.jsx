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
import StudentCourseRegistration from './components/StudentCourseRegistration';
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
          <Route path="/student-course-registration" element={<StudentCourseRegistration />} />
          
    </Routes>
  );
}

export default App;


