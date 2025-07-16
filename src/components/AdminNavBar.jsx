import { Link } from 'react-router-dom';

function AdminNavbar({ onLogout }) {
  return (
    <nav>
      <ul>
        <li><Link to="/add-course">Add Courses</Link></li>
        <li><Link to="/add-course-types">Add Course Types</Link></li>
        <li><Link to="/course-offering">Course Offering</Link></li>
        <li><Link to="/registered-students">Registered Students</Link></li>
        <li><button onClick={onLogout}>Logout</button></li>
      </ul>
    </nav>
  );
}

export default AdminNavbar;