import React, { useState } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import StudentDetails from './components/StudentDetails';
import { getAllStudents, createStudent, updateStudent, deleteStudent } from './services/studentService';
import './App.css';

// App Component - Main logic, state handling, view switching
function App() {
  // State for storing all students
  const [students, setStudents] = useState([]);
  
  // State for currently selected student (for edit/view)
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // State for current view mode: 'list', 'add', 'edit', 'details'
  const [viewMode, setViewMode] = useState('list');
  
  // State for loading indicator
  const [isLoading, setIsLoading] = useState(false);

  // Load all students from JSON Server
  const handleLoadStudents = async () => {
    setIsLoading(true);
    try {
      const data = await getAllStudents();
      setStudents(data);
      alert('✅ Students loaded successfully!');
    } catch (error) {
      alert('❌ Error loading students: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Switch to Add Student form
  const handleAddStudent = () => {
    setSelectedStudent(null);
    setViewMode('add');
  };

  // Switch to Edit Student form
  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setViewMode('edit');
  };

  // Delete a student
  const handleDeleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
        alert('✅ Student deleted successfully! Click "Load Students" to refresh the list.');
        // Optionally refresh the list automatically
        handleLoadStudents();
      } catch (error) {
        alert('❌ Error deleting student: ' + error.message);
      }
    }
  };

  // View student details
  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setViewMode('details');
  };

  // Handle form submission (both add and edit)
  const handleFormSubmit = async (studentData) => {
    try {
      if (viewMode === 'edit' && selectedStudent) {
        // Update existing student
        await updateStudent(selectedStudent.id, studentData);
        alert('✅ Student updated successfully! Click "Load Students" to see the changes.');
      } else {
        // Create new student
        await createStudent(studentData);
        alert('✅ Student added successfully! Click "Load Students" to see the new student.');
      }
      // Go back to list view
      setViewMode('list');
      setSelectedStudent(null);
      // Optionally refresh the list automatically
      handleLoadStudents();
    } catch (error) {
      alert('❌ Error saving student: ' + error.message);
    }
  };

  // Cancel form and go back to list
  const handleCancel = () => {
    setViewMode('list');
    setSelectedStudent(null);
  };

  // Render the appropriate view based on viewMode
  const renderView = () => {
    switch (viewMode) {
      case 'add':
        return (
          <StudentForm
            student={null}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
            isEditing={false}
          />
        );
      
      case 'edit':
        return (
          <StudentForm
            student={selectedStudent}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
            isEditing={true}
          />
        );
      
      case 'details':
        return (
          <StudentDetails
            student={selectedStudent}
            onBack={handleCancel}
          />
        );
      
      case 'list':
      default:
        return (
          <StudentList
            students={students}
            onLoadStudents={handleLoadStudents}
            onAddStudent={handleAddStudent}
            onEditStudent={handleEditStudent}
            onDeleteStudent={handleDeleteStudent}
            onViewDetails={handleViewDetails}
          />
        );
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">
          <span className="logo-icon">🎓</span>
          <h1>Student Result System</h1>
        </div>
        <nav className="nav-info">
          <span className="nav-badge">React + JSON Server</span>
        </nav>
      </header>
      
      <main className="app-main">
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>Loading...</p>
          </div>
        )}
        {renderView()}
      </main>
      
      <footer className="app-footer">
        <p>📚 Student Result Management System | Built with React & JSON Server</p>
      </footer>
    </div>
  );
}

export default App;

