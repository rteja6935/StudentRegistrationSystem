import React, { useState, useEffect } from 'react';
import '../CSS/CourseTypes.css'; 
function CourseTypes() {
  const [typeName, setTypeName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        const savedTypes = localStorage.getItem('courseTypes');
        if (savedTypes) {
          setCourseTypes(JSON.parse(savedTypes));
        }
      } catch (error) {
        console.error('Error parsing courseTypes from localStorage:', error);
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
      localStorage.setItem('courseTypes', JSON.stringify(courseTypes));
    } catch (error) {
      console.error('Error saving courseTypes to localStorage:', error);
    }
  }, [courseTypes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!typeName.trim()) {
      setError('Type name is required');
      return;
    }

    if (typeName.length > 30) {
      setError('Type name must be less than 30 characters');
      return;
    }

    setIsSubmitting(true);

    const courseTypeData = {
      name: typeName.trim(),
      description: description.trim(),
      isActive: true,
    };

    if (editingId) {
      const updatedTypes = courseTypes.map((type) =>
        type.id === editingId ? { ...type, ...courseTypeData } : type
      );
      setCourseTypes(updatedTypes);
    } else {
      const newType = {
        ...courseTypeData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      setCourseTypes((prev) => [...prev, newType]);
    }

    resetForm();
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setTypeName('');
    setDescription('');
    setError('');
    setEditingId(null);
  };

  const handleEdit = (type) => {
    setTypeName(type.name);
    setDescription(type.description);
    setEditingId(type.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (typeId) => {
    if (window.confirm('Are you sure you want to delete this course type?')) {
      setCourseTypes((prev) => prev.filter((type) => type.id !== typeId));
    }
  };

  const toggleStatus = (typeId) => {
    setCourseTypes((prev) =>
      prev.map((type) =>
        type.id === typeId ? { ...type, isActive: !type.isActive } : type
      )
    );
  };

  return (
    <div className="course-types-container">
      <h2>Course Type Management</h2>
      
      <div className="type-form-section">
        <h3>{editingId ? 'Edit Course Type' : 'Add New Course Type'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Type Name*:</label>
            <input
              type="text"
              value={typeName}
              onChange={(e) => {
                setTypeName(e.target.value);
                setError('');
              }}
              className={error ? 'error-input' : ''}
              placeholder="e.g., Individual, Group, Online"
              maxLength="30"
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of this course type"
              rows="3"
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          
          <div className="form-actions">
            <button type="submit" disabled={isSubmitting} className="submit-btn">
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

      <div className="type-list-section">
        <h3>Existing Course Types ({courseTypes.length})</h3>
        {courseTypes.length > 0 ? (
          <div className="course-table-wrapper">
          <table className="type-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courseTypes.map((type) => (
                <tr key={type.id} className={!type.isActive ? 'inactive' : ''}>
                  <td>{type.name}</td>
                  <td>{type.description || '-'}</td>
                  <td>
                    <span className={`status-badge ${type.isActive ? 'active' : 'inactive'}`}>
                      {type.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="action-buttons">
                    <button 
                      onClick={() => handleEdit(type)} // Fixed onClick handler
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => toggleStatus(type.id)}
                      className="toggle-btn"
                    >
                      {type.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleDelete(type.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        ) : (
          <p className="no-types">No course types added yet</p>
        )}
      </div>
    </div>
  );
}

export default CourseTypes;