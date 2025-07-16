import React, { useState, useEffect } from 'react';

function StudentCourseRegistration() {
  const [studentData, setStudentData] = useState({
    name: '',
    email: '',
    courseId: null,
  });
  const [courseDetails, setCourseDetails] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
  try {
    const selectedCourseId = localStorage.getItem('selectedCourseId');
    const savedOfferings = localStorage.getItem('offerings');

    if (!selectedCourseId || !savedOfferings) {
      setError('No course or offerings data found');
      return;
    }

    const offerings = JSON.parse(savedOfferings);
    const selectedCourse = offerings.find(
      (course) => course.id === parseInt(selectedCourseId, 10)
    );

    if (selectedCourse) {
      setCourseDetails(selectedCourse);
      setStudentData((prev) => ({
        ...prev,
        courseId: selectedCourse.id,
      }));
    } else {
      setError('Selected course not found');
    }
  } catch (error) {
    console.error('Error parsing data from localStorage:', error);
    setError('Failed to load course details');
  }
}, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!studentData.name || !studentData.email) {
      setError('Please fill in all required fields');
      return;
    }

    if (!studentData.courseId) {
      setError('No course selected');
      return;
    }

    try {
      const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
      const newRegistration = {
        id: Date.now(),
        student: {
          name: studentData.name,
          email: studentData.email,
        },
        courseId: studentData.courseId,
        registeredAt: new Date().toISOString(),
        courseName: courseDetails.courseName,
        typeName: courseDetails.typeName,
        status: 'Registered',
      };

      const offerings = JSON.parse(localStorage.getItem('offerings') || '[]');
      const updatedOfferings = offerings.map((course) =>
        course.id === studentData.courseId
          ? { ...course, isActive: false }
          : course
      );

      localStorage.setItem('registrations', JSON.stringify([...registrations, newRegistration]));
      localStorage.setItem('offerings', JSON.stringify(updatedOfferings));
      localStorage.removeItem('selectedCourseId');

      setSubmitted(true);
      setError('');
    } catch (error) {
      console.error('Error saving registration to localStorage:', error);
      setError('Failed to complete registration');
    }
  };

  if (submitted) {
    return (
      <div className="registration-success">
        <h2>Registration Successful!</h2>
        <p>Thank you, {studentData.name}. You've been registered for:</p>
        {courseDetails && (
          <div className="course-details">
            <p><strong>Course:</strong> {courseDetails.courseName}</p>
            <p><strong>Type:</strong> {courseDetails.typeName}</p>
          </div>
        )}
        <p>A confirmation has been sent to {studentData.email}.</p>
      </div>
    );
  }

  if (!courseDetails) {
    return (
      <div className="registration-error">
        <h2>No Course Selected</h2>
        <p>Please select a course to register from the courses page.</p>
      </div>
    );
  }

  return (
    <div className="student-registration">
      <h2>Student Course Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name*:</label>
          <input
            type="text"
            name="name"
            value={studentData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="form-group">
          <label>Email*:</label>
          <input
            type="email"
            name="email"
            value={studentData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className="course-details-section">
          <h3>Selected Course</h3>
          <div className="course-card">
            <h4>{courseDetails.courseName}</h4>
            <p><strong>Type:</strong> {courseDetails.typeName}</p>
            <p><strong>Price:</strong> ${courseDetails.price || 'Free'}</p>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="submit-btn">
          Complete Registration
        </button>
      </form>
    </div>
  );
}

export default StudentCourseRegistration;