import React, { useState } from 'react';
import './App.css';
import MentorDashboard from './components/mentorDashboard';
import StudentList from './components/studentList';
import studentData from './data.json';

function App() {
  const [students, setStudents] = useState(studentData);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleStudentSelect = (student) => {
    if (student.projectStatus === 'unassigned' && selectedStudents.length < 4) {
      const updatedStudents = students.map((s) =>
        s.rollNumber === student.rollNumber ? { ...s, projectStatus: 'assigned' } : s
      );
      setStudents(updatedStudents);
      setSelectedStudents([...selectedStudents, student]);
    }
  };

  const handleStudentStatusChange = (rollNumber, status) => {
    const updatedStudents = students.map((s) =>
      s.rollNumber === rollNumber ? { ...s, projectStatus: status } : s
    );
    setStudents(updatedStudents);
  };

  const handleRemoveStudent = (student) => {
    handleStudentStatusChange(student.rollNumber, 'unassigned');
    setSelectedStudents(selectedStudents.filter((s) => s.rollNumber !== student.rollNumber));
  };

  return (
    <div className="app">
      <StudentList
        students={students}
        selectedStudents={selectedStudents}
        onStudentSelect={handleStudentSelect}
        onStudentStatusChange={handleStudentStatusChange}
      />
      <MentorDashboard
        selectedStudents={selectedStudents}
        removeStudent={handleRemoveStudent}
        onStudentStatusChange={handleStudentStatusChange}
      />
    </div>
  );
}

export default App;
