import React, { useState, useEffect } from 'react';
import '../CSS/CourseOffering.css';
function CourseOffering() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [price, setPrice] = useState('');
  const [schedule, setSchedule] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [offerings, setOfferings] = useState(() => {
    try {
      const savedOfferings = localStorage.getItem('offerings');
      return savedOfferings ? JSON.parse(savedOfferings) : [];
    } catch (error) {
      console.error('Error parsing offerings from localStorage:', error);
      return [];
    }
  });
  const [courses, setCourses] = useState(() => {
    try {
      const savedCourses = localStorage.getItem('courses');
      return savedCourses ? JSON.parse(savedCourses) : [];
    } catch (error) {
      console.error('Error parsing courses from localStorage:', error);
      return [];
    }
  });
  const [courseTypes, setCourseTypes] = useState(() => {
    try {
      const savedTypes = localStorage.getItem('courseTypes');
      return savedTypes ? JSON.parse(savedTypes) : [];
    } catch (error) {
      console.error('Error parsing courseTypes from localStorage:', error);
      return [];
    }
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const savedOfferings = localStorage.getItem('offerings');
        const savedCourses = localStorage.getItem('courses');
        const savedTypes = localStorage.getItem('courseTypes');

        if (savedOfferings) setOfferings(JSON.parse(savedOfferings));
        if (savedCourses) setCourses(JSON.parse(savedCourses));
        if (savedTypes) setCourseTypes(JSON.parse(savedTypes));
      } catch (error) {
        console.error('Error parsing data from localStorage:', error);
        setOfferings([]);
        setCourses([]);
        setCourseTypes([]);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('offerings', JSON.stringify(offerings));
    } catch (error) {
      console.error('Error saving offerings to localStorage:', error);
    }
  }, [offerings]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedCourse || !selectedType) {
      setError('Please select both course and type');
      return;
    }

    setIsSubmitting(true);

    const course = courses.find((c) => c.id == selectedCourse);
    const type = courseTypes.find((t) => t.id == selectedType);

    const offeringData = {
      courseId: selectedCourse,
      typeId: selectedType,
      courseName: course?.name || '',
      typeName: type?.name || '',
      price: price || '0',
      schedule: schedule || 'TBD',
      isActive: true,
    };

    if (editingId) {
      setOfferings((prev) =>
        prev.map((o) => (o.id === editingId ? { ...o, ...offeringData } : o))
      );
    } else {
      const newOffering = {
        ...offeringData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      setOfferings((prev) => [...prev, newOffering]);
    }

    resetForm();
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setSelectedCourse('');
    setSelectedType('');
    setPrice('');
    setSchedule('');
    setError('');
    setEditingId(null);
  };

  const handleEdit = (offering) => {
    setSelectedCourse(offering.courseId);
    setSelectedType(offering.typeId);
    setPrice(offering.price);
    setSchedule(offering.schedule);
    setEditingId(offering.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this offering?')) {
      setOfferings((prev) => prev.filter((o) => o.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setOfferings((prev) =>
      prev.map((o) => (o.id === id ? { ...o, isActive: !o.isActive } : o))
    );
  };

  return (
    <div className="offering-container">
      <h2>Course Offering Management</h2>
      
      <div className="offering-form-section">
        <h3>{editingId ? 'Edit Offering' : 'Create New Offering'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Course*:</label>
            <select
              value={selectedCourse}
              onChange={(e) => {
                setSelectedCourse(e.target.value);
                setError('');
              }}
              className={error && !selectedCourse ? 'error-input' : ''}
            >
              <option value="">-- Select Course --</option>
              {courses.filter((c) => c.isActive).map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Select Type*:</label>
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setError('');
              }}
              className={error && !selectedType ? 'error-input' : ''}
            >
              <option value="">-- Select Type --</option>
              {courseTypes.filter((t) => t.isActive).map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Price ($):</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g., 99.99"
              min="0"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label>Schedule:</label>
            <input
              type="text"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              placeholder="e.g., Mon/Wed 6-8pm"
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          
          <div className="form-actions">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="submit-btn"
            >
              {isSubmitting ? 'Saving...' : editingId ? 'Update' : 'Create'}
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

      <div className="offering-list-section">
        <h3>Current Offerings ({offerings.length})</h3>
        {offerings.length > 0 ? (
          <table className="offering-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Type</th>
                <th>Price</th>
                <th>Schedule</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {offerings.map((offering) => {
                const course = courses.find((c) => c.id == offering.courseId) || {};
                const type = courseTypes.find((t) => t.id == offering.typeId) || {};
                
                return (
                  <tr key={offering.id} className={!offering.isActive ? 'inactive' : ''}>
                    <td>{course.name || offering.courseName}</td>
                    <td>{type.name || offering.typeName}</td>
                    <td>${offering.price}</td>
                    <td>{offering.schedule}</td>
                    <td>
                      <span className={`status-badge ${offering.isActive ? 'active' : 'inactive'}`}>
                        {offering.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="action-buttons">
                      <button 
                        onClick={() => handleEdit(offering)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => toggleStatus(offering.id)}
                        className="toggle-btn"
                      >
                        {offering.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleDelete(offering.id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="no-offerings">No offerings created yet</p>
        )}
      </div>
    </div>
  );
}

export default CourseOffering;