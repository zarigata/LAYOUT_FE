// ██████╗ █████╗ ██████╗ ███████╗██╗  ██╗
// ██╔════╝██╔══██╗██╔══██╗██╔════╝╚██╗██╔╝
// ██║     ███████║██║  ██║█████╗   ╚███╔╝ 
// ██║     ██╔══██║██║  ██║██╔══╝   ██╔██╗ 
// ╚██████╗██║  ██║██████╔╝███████╗██╔╝ ██╗
// ╚═════╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝
// API Services for specific entities

import { api } from './apiClient';
import type {
  User,
  Course,
  Assignment,
  AssignmentSubmission,
  AITutorSession,
  AITutorMessage,
  AIGeneratedClass,
  StudentProgress,
  ClassAnalytics,
  SystemMetrics,
  ActivityLog,
  Trinket,
  UserTrinket
} from '@/types';

/**
 * User Service - Handles user-related API requests
 */
export const userService = {
  // Get current user profile
  getCurrentUser: () => api.get<User>('/users/me'),
  
  // Get user by ID
  getUserById: (userId: string) => api.get<User>(`/users/${userId}`),
  
  // Update user profile
  updateProfile: (userId: string, userData: Partial<User>) => 
    api.put<User>(`/users/${userId}`, userData),
  
  // Update user preferences
  updatePreferences: (userId: string, preferences: any) => 
    api.patch<User>(`/users/${userId}/preferences`, { preferences }),
    
  // Get all users (admin only)
  getAllUsers: (page = 1, limit = 20, filters?: any) => 
    api.get<User[]>('/users', { 
      body: { page, limit, ...filters } 
    }),
    
  // Create new user (admin only)
  createUser: (userData: Partial<User>) => 
    api.post<User>('/users', userData),
    
  // Delete user (admin only)
  deleteUser: (userId: string) => 
    api.delete(`/users/${userId}`),
};

/**
 * Course Service - Handles course/class related API requests
 */
export const courseService = {
  // Get all courses
  getAllCourses: (page = 1, limit = 20, filters?: any) => 
    api.get<Course[]>('/courses', { 
      body: { page, limit, ...filters } 
    }),
  
  // Get course by ID
  getCourseById: (courseId: string) => 
    api.get<Course>(`/courses/${courseId}`),
  
  // Get courses for teacher
  getTeacherCourses: (teacherId: string) => 
    api.get<Course[]>(`/teachers/${teacherId}/courses`),
  
  // Get courses for student
  getStudentCourses: (studentId: string) => 
    api.get<Course[]>(`/students/${studentId}/courses`),
  
  // Create new course (teacher/admin only)
  createCourse: (courseData: Partial<Course>) => 
    api.post<Course>('/courses', courseData),
  
  // Update course (teacher/admin only)
  updateCourse: (courseId: string, courseData: Partial<Course>) => 
    api.put<Course>(`/courses/${courseId}`, courseData),
  
  // Delete course (teacher/admin only)
  deleteCourse: (courseId: string) => 
    api.delete(`/courses/${courseId}`),
  
  // Enroll student in course
  enrollStudent: (courseId: string, studentId: string) => 
    api.post<{success: boolean}>(`/courses/${courseId}/enroll`, { studentId }),
  
  // Remove student from course
  removeStudent: (courseId: string, studentId: string) => 
    api.delete(`/courses/${courseId}/students/${studentId}`),
};

/**
 * Assignment Service - Handles assignment related API requests
 */
export const assignmentService = {
  // Get all assignments for a course
  getCourseAssignments: (courseId: string) => 
    api.get<Assignment[]>(`/courses/${courseId}/assignments`),
  
  // Get assignment by ID
  getAssignmentById: (assignmentId: string) => 
    api.get<Assignment>(`/assignments/${assignmentId}`),
  
  // Create new assignment
  createAssignment: (courseId: string, assignmentData: Partial<Assignment>) => 
    api.post<Assignment>(`/courses/${courseId}/assignments`, assignmentData),
  
  // Update assignment
  updateAssignment: (assignmentId: string, assignmentData: Partial<Assignment>) => 
    api.put<Assignment>(`/assignments/${assignmentId}`, assignmentData),
  
  // Delete assignment
  deleteAssignment: (assignmentId: string) => 
    api.delete(`/assignments/${assignmentId}`),
  
  // Get student assignments
  getStudentAssignments: (studentId: string, status?: string) => 
    api.get<Assignment[]>(`/students/${studentId}/assignments`, {
      body: { status }
    }),
  
  // Submit assignment
  submitAssignment: (assignmentId: string, submission: Partial<AssignmentSubmission>) => 
    api.post<AssignmentSubmission>(`/assignments/${assignmentId}/submit`, submission),
  
  // Grade assignment submission
  gradeSubmission: (submissionId: string, grade: number, feedback?: string) => 
    api.put<AssignmentSubmission>(`/submissions/${submissionId}`, { grade, feedback }),
};

/**
 * AI Tutor Service - Handles AI tutor related API requests
 */
export const aiTutorService = {
  // Start new AI tutor session
  startSession: (userId: string, subject?: string) => 
    api.post<AITutorSession>('/ai/tutor/sessions', { userId, subject }),
  
  // Get session by ID
  getSessionById: (sessionId: string) => 
    api.get<AITutorSession>(`/ai/tutor/sessions/${sessionId}`),
  
  // Get user sessions
  getUserSessions: (userId: string) => 
    api.get<AITutorSession[]>(`/users/${userId}/ai-sessions`),
  
  // Send message to AI tutor
  sendMessage: (sessionId: string, content: string) => 
    api.post<AITutorMessage>(`/ai/tutor/sessions/${sessionId}/messages`, { content }),
  
  // End session
  endSession: (sessionId: string) => 
    api.put<AITutorSession>(`/ai/tutor/sessions/${sessionId}/end`, {}),
  
  // Provide feedback on AI response
  provideFeedback: (messageId: string, feedback: 'positive' | 'negative') => 
    api.post(`/ai/tutor/messages/${messageId}/feedback`, { feedback }),
};

/**
 * AI Class Generator Service - Handles AI class generation related API requests
 */
export const aiClassGeneratorService = {
  // Generate new class plan
  generateClass: (teacherId: string, params: {
    subject: string;
    gradeLevel: string;
    duration: number;
    topics?: string[];
  }) => api.post<AIGeneratedClass>('/ai/class-generator', {
    teacherId,
    ...params
  }),
  
  // Get generated class by ID
  getGeneratedClassById: (classId: string) => 
    api.get<AIGeneratedClass>(`/ai/class-generator/${classId}`),
  
  // Save generated class to library
  saveToLibrary: (classId: string) => 
    api.put<AIGeneratedClass>(`/ai/class-generator/${classId}/save`, { savedToLibrary: true }),
  
  // Get teacher's saved classes
  getTeacherClasses: (teacherId: string) => 
    api.get<AIGeneratedClass[]>(`/teachers/${teacherId}/generated-classes`),
  
  // Delete generated class
  deleteGeneratedClass: (classId: string) => 
    api.delete(`/ai/class-generator/${classId}`),
};

/**
 * Progress Service - Handles student progress tracking
 */
export const progressService = {
  // Get student progress for a course
  getStudentProgress: (studentId: string, courseId: string) => 
    api.get<StudentProgress>(`/students/${studentId}/courses/${courseId}/progress`),
  
  // Update student progress
  updateProgress: (studentId: string, courseId: string, progressData: Partial<StudentProgress>) => 
    api.put<StudentProgress>(`/students/${studentId}/courses/${courseId}/progress`, progressData),
  
  // Get class analytics
  getClassAnalytics: (courseId: string) => 
    api.get<ClassAnalytics>(`/courses/${courseId}/analytics`),
};

/**
 * Admin Service - Handles admin-only operations
 */
export const adminService = {
  // Get system metrics
  getSystemMetrics: () => 
    api.get<SystemMetrics>('/admin/metrics'),
  
  // Get activity logs
  getActivityLogs: (page = 1, limit = 50, filters?: any) => 
    api.get<ActivityLog[]>('/admin/activity-logs', {
      body: { page, limit, ...filters }
    }),
  
  // Get user activity
  getUserActivity: (userId: string) => 
    api.get<ActivityLog[]>(`/admin/users/${userId}/activity`),
};

/**
 * Trinket Service - Handles trinket/badge related operations
 */
export const trinketService = {
  // Get all trinkets
  getAllTrinkets: () => 
    api.get<Trinket[]>('/trinkets'),
  
  // Get trinket by ID
  getTrinketById: (trinketId: string) => 
    api.get<Trinket>(`/trinkets/${trinketId}`),
  
  // Create new trinket (admin only)
  createTrinket: (trinketData: Partial<Trinket>) => 
    api.post<Trinket>('/trinkets', trinketData),
  
  // Update trinket (admin only)
  updateTrinket: (trinketId: string, trinketData: Partial<Trinket>) => 
    api.put<Trinket>(`/trinkets/${trinketId}`, trinketData),
  
  // Delete trinket (admin only)
  deleteTrinket: (trinketId: string) => 
    api.delete(`/trinkets/${trinketId}`),
  
  // Award trinket to user
  awardTrinket: (userId: string, trinketId: string) => 
    api.post<UserTrinket>(`/users/${userId}/trinkets`, { trinketId }),
  
  // Get user trinkets
  getUserTrinkets: (userId: string) => 
    api.get<UserTrinket[]>(`/users/${userId}/trinkets`),
  
  // Remove trinket from user
  removeTrinket: (userId: string, trinketId: string) => 
    api.delete(`/users/${userId}/trinkets/${trinketId}`),
};
