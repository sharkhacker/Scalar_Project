import React, { useState } from 'react';
function MentorDashboard({ students, selectedStudents, removeStudent, onStudentStatusChange }) {
  const [marks, setMarks] = useState({});
  const [editedStudent, setEditedStudent] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [filter, setFilter] = useState('all');
  const [maxStudents, setMaxStudents] = useState(4); // Initially set to 4

  // Function to assign class based on the student's status
  const getStatusClass = (status) => {
    if (status === 'assigned') {
      return 'assigned';
    } else if (status === 'unassigned') {
      return 'unassigned';
    } else {
      return ''; // No specific class for other statuses
    }
  };

  const handleMarksChange = (student, subject, value) => {
    if (!isLocked) {
      setMarks({
        ...marks,
        [student.rollNumber]: {
          ...marks[student.rollNumber],
          [subject]: value,
        },
      });
    }
  };

  const handleEdit = (student) => {
    if (!isLocked) {
      setEditedStudent(student);
    }
  };

  const handleSave = (student) => {
    setEditedStudent(null);
  };

  const canSubmit =
    !isLocked &&
    selectedStudents.length >= 3 &&
    selectedStudents.every(
      (student) =>
        marks[student.rollNumber]?.ideation &&
        marks[student.rollNumber]?.execution &&
        marks[student.rollNumber]?.presentation
    );

  const handleSubmit = () => {
    if (canSubmit) {
      setIsLocked(true);
      setMaxStudents(3); // Change the maximum limit to 3 after submit
      alert("Results in PDF format sent to all students in the group.");
    }
  };

  const filteredStudents = selectedStudents.filter((student) => {
    if (filter === 'assigned') {
      return (
        marks[student.rollNumber]?.ideation &&
        marks[student.rollNumber]?.execution &&
        marks[student.rollNumber]?.presentation
      );
    }
    if (filter === 'unassigned') {
      return (
        !marks[student.rollNumber]?.ideation ||
        !marks[student.rollNumber]?.execution ||
        !marks[student.rollNumber]?.presentation
      );
    }
    return true;
  });

  const handleSelect = (student) => {
    if (!isLocked && selectedStudents.length < maxStudents) {
      onStudentStatusChange(student, 'assigned');
    }
  };

  return (
    <div className="mentor-dashboard">
      <h2>Mentor Dashboard</h2>
      <div className="filters">
        <button onClick={() => setFilter('all')}>All Students</button>
        <button onClick={() => setFilter('assigned')}>Marks Assigned</button>
        <button onClick={() => setFilter('unassigned')}>Marks Yet to be Assigned</button>
      </div>
      <ul>
        {filteredStudents.map((student) => (
          <li key={student.rollNumber}>
            <div className={`student-card ${getStatusClass(student.projectStatus)}`}>
              <div className="student-info">
                <div>
                  <strong>Name:</strong> {student.name}
                </div>
                <div>
                  <strong>Roll Number:</strong> {student.rollNumber}
                </div>
                <div>
                  <strong>Tech Stack:</strong> {student.techStack}
                </div>
              </div>
              <div className="marks">
                Ideation:{' '}
                {editedStudent === student && !isLocked ? (
                  <>
                    <input
                      type="number"
                      value={marks[student.rollNumber]?.ideation || ''}
                      onChange={(e) => handleMarksChange(student, 'ideation', e.target.value)}
                    />
                    <button onClick={() => handleSave(student)}>Save</button>
                  </>
                ) : (
                  marks[student.rollNumber]?.ideation
                )}
                Execution:{' '}
                {editedStudent === student && !isLocked ? (
                  <>
                    <input
                      type="number"
                      value={marks[student.rollNumber]?.execution || ''}
                      onChange={(e) => handleMarksChange(student, 'execution', e.target.value)}
                    />
                    <button onClick={() => handleSave(student)}>Save</button>
                  </>
                ) : (
                  marks[student.rollNumber]?.execution
                )}
                Presentation:{' '}
                {editedStudent === student && !isLocked ? (
                  <>
                    <input
                      type="number"
                      value={marks[student.rollNumber]?.presentation || ''}
                      onChange={(e) => handleMarksChange(student, 'presentation', e.target.value)}
                    />
                    <button onClick={() => handleSave(student)}>Save</button>
                  </>
                ) : (
                  marks[student.rollNumber]?.presentation
                )}
              </div>
              <div className="buttons">
                {editedStudent === student && !isLocked ? (
                  <button onClick={() => handleSave(student)}>Save</button>
                ) : (
                  <>
                    {!isLocked && (
                      <button onClick={() => handleEdit(student)}>Edit</button>
                    )}
                    {!isLocked && (
                      <button onClick={() => removeStudent(student)}>Remove</button>
                    )}
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit} disabled={!canSubmit || isLocked}>
        Submit All
      </button>
    </div>
  );
}

export default MentorDashboard;
