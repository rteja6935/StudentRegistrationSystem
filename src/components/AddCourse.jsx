import React, { useState, useEffect } from 'react';
import '../CSS/Addcourse.css'; 
function AddCourse() {
  const [courseName, setCourseName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courses, setCourses] = useState(() => {
    try {
      const savedCourses = localStorage.getItem('courses');
      return savedCourses ? JSON.parse(savedCourses) : [];
    } catch (error) {
      console.error('Error parsing courses from localStorage:', error);
      return [];
    }
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const savedCourses = localStorage.getItem('courses');
        if (savedCourses) {
          setCourses(JSON.parse(savedCourses));
        }
      } catch (error) {
        console.error('Error parsing courses from localStorage:', error);
        setCourses([]);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('courses', JSON.stringify(courses));
    } catch (error) {
      console.error('Error saving courses to localStorage:', error);
    }
  }, [courses]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!courseName.trim()) {
      setError('Course name is required');
      return;
    }

    if (courseName.length > 50) {
      setError('Course name must be less than 50 characters');
      return;
    }

    setIsSubmitting(true);

    const courseData = {
      name: courseName.trim(),
      isActive: true,
    };

    if (editingId) {
      const updatedCourses = courses.map((course) =>
        course.id === editingId ? { ...course, ...courseData } : course
      );
      setCourses(updatedCourses);
    } else {
      const newCourse = {
        ...courseData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      setCourses((prev) => [...prev, newCourse]);
    }

    resetForm();
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setCourseName('');
    setError('');
    setEditingId(null);
  };

  const handleEdit = (course) => {
    setCourseName(course.name);
    setEditingId(course.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses((prev) => prev.filter((course) => course.id !== courseId));
    }
  };

  const toggleStatus = (courseId) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId ? { ...course, isActive: !course.isActive } : course
      )
    );
  };

  return (
    <div className="add-course-container">
      <h2>Course Management</h2>
      
      <div className="course-form-section">
        <h3>{editingId ? 'Edit Course' : 'Add New Course'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Course Name*:</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => {
                setCourseName(e.target.value);
                setError('');
              }}
              className={error ? 'error-input' : ''}
              placeholder="e.g., Mathematics, English Literature"
              maxLength="50"
            />
            {error && <div className="error-message">{error}</div>}
          </div>
          
          <div className="form-actions">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="submit-btn"
            >
              {isSubmitting ? 'Saving...' : editingId ? 'Update' : 'Add'}
            </button>
            {editingId && (
              <button 
                type="button" 
                onClick={resetForm}
                className="cancel-btn"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="course-list-section">
        <h3>Existing Courses ({courses.length})</h3>
        {courses.length > 0 ? (
          <table className="course-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className={!course.isActive ? 'inactive' : ''}>
                  <td>{course.name}</td>
                  <td>
                    <span className={`status-badge ${course.isActive ? 'active' : 'inactive'}`}>
                      {course.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="action-buttons">
                    <button 
                      onClick={() => handleEdit(course)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => toggleStatus(course.id)}
                      className="toggle-btn"
                    >
                      {course.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-courses">No courses added yet</p>
        )}
      </div>
    </div>
  );
}

export default AddCourse;