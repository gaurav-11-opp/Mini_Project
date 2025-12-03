import React, { useState } from 'react';

// StudentForm Component - Used for both Adding & Editing students
const StudentForm = ({ student, onSubmit, onCancel, isEditing }) => {
  // Form state using useState
  const [name, setName] = useState(student ? student.name : '');
  const [section, setSection] = useState(student ? student.section : '');
  const [marks, setMarks] = useState(student ? student.marks : '');
  const [grade, setGrade] = useState(student ? student.grade : '');
  const [errors, setErrors] = useState({});

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!section.trim()) {
      newErrors.section = 'Section is required';
    }
    
    if (marks === '' || marks === null) {
      newErrors.marks = 'Marks are required';
    } else if (isNaN(marks) || marks < 0 || marks > 100) {
      newErrors.marks = 'Marks must be between 0 and 100';
    }
    
    if (!grade.trim()) {
      newErrors.grade = 'Grade is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const studentData = {
      name: name.trim(),
      section: section.trim().toUpperCase(),
      marks: parseInt(marks, 10),
      grade: grade.trim().toUpperCase(),
    };

    // Include id if editing
    if (isEditing && student) {
      studentData.id = student.id;
    }

    onSubmit(studentData);
  };

  // Auto-calculate grade based on marks
  const calculateGrade = (marksValue) => {
    const m = parseInt(marksValue, 10);
    if (isNaN(m)) return '';
    if (m >= 90) return 'A+';
    if (m >= 80) return 'A';
    if (m >= 70) return 'B';
    if (m >= 60) return 'C';
    if (m >= 50) return 'D';
    return 'F';
  };

  // Handle marks change and auto-fill grade
  const handleMarksChange = (e) => {
    const value = e.target.value;
    setMarks(value);
    if (value !== '') {
      setGrade(calculateGrade(value));
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>{isEditing ? '✏️ Edit Student' : '➕ Add New Student'}</h2>
        <p className="form-subtitle">
          {isEditing 
            ? 'Update the student information below' 
            : 'Fill in the details to add a new student record'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-group">
          <label htmlFor="name">
            👤 Student Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter student name"
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="section">
            🏫 Section
          </label>
          <input
            type="text"
            id="section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            placeholder="Enter section (e.g., A, B, C)"
            className={errors.section ? 'error' : ''}
          />
          {errors.section && <span className="error-message">{errors.section}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="marks">
            📝 Marks (0-100)
          </label>
          <input
            type="number"
            id="marks"
            value={marks}
            onChange={handleMarksChange}
            placeholder="Enter marks"
            min="0"
            max="100"
            className={errors.marks ? 'error' : ''}
          />
          {errors.marks && <span className="error-message">{errors.marks}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="grade">
            🎓 Grade
          </label>
          <select
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className={errors.grade ? 'error' : ''}
          >
            <option value="">Select Grade</option>
            <option value="A+">A+ (90-100)</option>
            <option value="A">A (80-89)</option>
            <option value="B">B (70-79)</option>
            <option value="C">C (60-69)</option>
            <option value="D">D (50-59)</option>
            <option value="F">F (Below 50)</option>
          </select>
          {errors.grade && <span className="error-message">{errors.grade}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-success">
            {isEditing ? '💾 Update Student' : '➕ Add Student'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;

