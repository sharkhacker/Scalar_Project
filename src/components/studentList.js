import React, { useState } from 'react';

function StudentList({ students, selectedStudents, onStudentSelect, onStudentStatusChange }) {
  const [filterStatus, setFilterStatus] = useState('all');

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  const filteredStudents = students.filter((student) => {
    if (filterStatus === 'all') {
      return true; // Show all students
    } else {
      return student.projectStatus === filterStatus;
    }
  });

  return (
    <div className="student-list">
      <h2>Student List</h2>
      <div className="filter-buttons">
        <button onClick={() => handleFilterChange('all')}>All</button>
        <button onClick={() => handleFilterChange('assigned')}>Assigned</button>
        <button onClick={() => handleFilterChange('unassigned')}>Unassigned</button>
      </div>
      <ul>
        {filteredStudents.map((student) => (
          <li key={student.rollNumber}>
            <div className="student-card">
              <div>
                <strong>Name:</strong> {student.name}
              </div>
              <div>
                <strong>Roll Number:</strong> {student.rollNumber}
              </div>
              <div>
                <strong>Tech Stack:</strong> {student.techStack}
              </div>
              <div>
                <strong>Status:</strong> {student.projectStatus}
                {student.projectStatus === 'assigned' ? (
                  <span className="assigned-warning"></span>
                ) : (
                  <button
                  onClick={() => onStudentSelect(student)}
                  style={{
                    background: 'linear-gradient(90deg, #4c1d95, #bd3d92)',
                    color: '#fff',
                    border: 'none',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    borderRadius: '20px',
                  }}
                >
                  Select
                </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
