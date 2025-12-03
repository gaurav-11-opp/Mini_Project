// Student Service - Handles all API calls (CRUD operations)
const API_URL = 'http://localhost:3001/students';

// GET - Fetch all students
export const getAllStudents = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch students');
  }
  return response.json();
};

// GET - Fetch single student by ID
export const getStudentById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch student');
  }
  return response.json();
};

// POST - Create new student
export const createStudent = async (studentData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData),
  });
  if (!response.ok) {
    throw new Error('Failed to create student');
  }
  return response.json();
};

// PUT - Update existing student
export const updateStudent = async (id, studentData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData),
  });
  if (!response.ok) {
    throw new Error('Failed to update student');
  }
  return response.json();
};

// DELETE - Remove student
export const deleteStudent = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete student');
  }
  return response.json();
};

