import React from 'react';

// StudentDetails Component - Shows complete info of one student (read-only view)
const StudentDetails = ({ student, onBack }) => {
  // Determine performance level based on marks
  const getPerformanceLevel = (marks) => {
    if (marks >= 90) return { level: 'Excellent', color: '#10b981', icon: '🌟' };
    if (marks >= 80) return { level: 'Very Good', color: '#3b82f6', icon: '⭐' };
    if (marks >= 70) return { level: 'Good', color: '#8b5cf6', icon: '👍' };
    if (marks >= 60) return { level: 'Average', color: '#f59e0b', icon: '📚' };
    if (marks >= 50) return { level: 'Needs Improvement', color: '#f97316', icon: '📖' };
    return { level: 'Fail', color: '#ef4444', icon: '⚠️' };
  };

  const performance = getPerformanceLevel(student.marks);

  // Calculate percentage
  const percentage = student.marks;

  return (
    <div className="details-container">
      <div className="details-header">
        <h2>📋 Student Result Details</h2>
        <p className="details-subtitle">Complete information and performance analysis</p>
      </div>

      <div className="details-card">
        <div className="student-avatar">
          <div className="avatar-circle">
            {student.name.charAt(0).toUpperCase()}
          </div>
          <h3 className="student-name">{student.name}</h3>
          <span className="student-id">Student ID: #{student.id}</span>
        </div>

        <div className="details-grid">
          <div className="detail-item">
            <div className="detail-icon">🏫</div>
            <div className="detail-content">
              <span className="detail-label">Section</span>
              <span className="detail-value">{student.section}</span>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon">📝</div>
            <div className="detail-content">
              <span className="detail-label">Marks Obtained</span>
              <span className="detail-value">{student.marks} / 100</span>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon">🎓</div>
            <div className="detail-content">
              <span className="detail-label">Grade</span>
              <span className={`detail-value grade-badge grade-${student.grade.replace('+', '-plus').replace('-', '-minus')}`}>
                {student.grade}
              </span>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon">📊</div>
            <div className="detail-content">
              <span className="detail-label">Percentage</span>
              <span className="detail-value">{percentage}%</span>
            </div>
          </div>
        </div>

        <div className="performance-section">
          <h4>Performance Analysis</h4>
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ 
                width: `${percentage}%`,
                backgroundColor: performance.color 
              }}
            >
              <span className="progress-text">{percentage}%</span>
            </div>
          </div>
          <div className="performance-badge" style={{ backgroundColor: performance.color }}>
            <span className="performance-icon">{performance.icon}</span>
            <span className="performance-text">{performance.level}</span>
          </div>
        </div>

        <div className="result-status">
          {student.marks >= 50 ? (
            <div className="status-pass">
              <span className="status-icon">✅</span>
              <span className="status-text">PASSED</span>
            </div>
          ) : (
            <div className="status-fail">
              <span className="status-icon">❌</span>
              <span className="status-text">FAILED</span>
            </div>
          )}
        </div>
      </div>

      <div className="details-actions">
        <button className="btn btn-primary" onClick={onBack}>
          ← Back to Student List
        </button>
      </div>
    </div>
  );
};

export default StudentDetails;

