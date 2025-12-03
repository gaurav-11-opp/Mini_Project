import React from 'react';

// StudentList Component - Shows all students in a table with action buttons
const StudentList = ({ students, onLoadStudents, onAddStudent, onEditStudent, onDeleteStudent, onViewDetails }) => {
  return (
    <div className="student-list-container">
      <div className="header">
        <h2>📚 Student Results Management</h2>
        <p className="subtitle">Manage student records, grades, and results</p>
      </div>

      <div className="action-buttons">
        <button className="btn btn-primary" onClick={onLoadStudents}>
          🔄 Load Students
        </button>
        <button className="btn btn-success" onClick={onAddStudent}>
          ➕ Add Student
        </button>
      </div>

      {students.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No Students Found</h3>
          <p>Click "Load Students" to fetch data or "Add Student" to create a new record.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="student-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Section</th>
                <th>Marks</th>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="id-cell">{student.id}</td>
                  <td className="name-cell">{student.name}</td>
                  <td className="section-cell">
                    <span className="section-badge">{student.section}</span>
                  </td>
                  <td className="marks-cell">{student.marks}</td>
                  <td className="grade-cell">
                    <span className={`grade-badge grade-${student.grade.replace('+', '-plus').replace('-', '-minus')}`}>
                      {student.grade}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button 
                      className="btn btn-info btn-sm" 
                      onClick={() => onViewDetails(student)}
                      title="View Details"
                    >
                      👁️ View
                    </button>
                    <button 
                      className="btn btn-warning btn-sm" 
                      onClick={() => onEditStudent(student)}
                      title="Edit Student"
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      className="btn btn-danger btn-sm" 
                      onClick={() => onDeleteStudent(student.id)}
                      title="Delete Student"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="stats-bar">
        <span className="stat-item">
          📊 Total Students: <strong>{students.length}</strong>
        </span>
        {students.length > 0 && (
          <>
            <span className="stat-item">
              📈 Average Marks: <strong>{(students.reduce((sum, s) => sum + s.marks, 0) / students.length).toFixed(1)}</strong>
            </span>
            <span className="stat-item">
              🏆 Highest: <strong>{Math.max(...students.map(s => s.marks))}</strong>
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentList;

