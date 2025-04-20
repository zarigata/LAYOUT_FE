// ██████╗ █████╗ ██████╗ ███████╗██╗  ██╗
// ██╔════╝██╔══██╗██╔══██╗██╔════╝╚██╗██╔╝
// ██║     ███████║██║  ██║█████╗   ╚███╔╝ 
// ██║     ██╔══██║██║  ██║██╔══╝   ██╔██╗ 
// ╚██████╗██║  ██║██████╔╝███████╗██╔╝ ██╗
// ╚═════╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝
// Core data models for the teaching platform

// User types
export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'ja' | 'pt';
  notifications: NotificationPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  assignments: boolean;
  grades: boolean;
  announcements: boolean;
}

// Course/Class types
export interface Course {
  id: string;
  name: string;
  description: string;
  subject: string;
  teacherId: string;
  teacherName: string;
  startDate: string;
  endDate: string;
  schedule: ClassSchedule[];
  enrolledStudents: number;
  maxStudents: number;
  isActive: boolean;
  materials: CourseMaterial[];
  assignments: Assignment[];
}

export interface ClassSchedule {
  id: string;
  dayOfWeek: number; // 0-6, where 0 is Sunday
  startTime: string; // Format: "HH:MM"
  endTime: string; // Format: "HH:MM"
  room: string;
}

export interface CourseMaterial {
  id: string;
  title: string;
  type: 'document' | 'video' | 'link' | 'other';
  url: string;
  uploadedAt: string;
  size?: number; // in bytes
}

// Assignment types
export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  points: number;
  status: 'draft' | 'published' | 'closed';
  createdAt: string;
  updatedAt: string;
  submissions?: AssignmentSubmission[];
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  grade?: number;
  feedback?: string;
  attachments?: string[];
  status: 'submitted' | 'graded' | 'late' | 'missing';
}

// AI Interaction types
export interface AITutorMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  metadata?: {
    subject?: string;
    topic?: string;
    feedback?: 'positive' | 'negative' | null;
  };
}

export interface AITutorSession {
  id: string;
  userId: string;
  messages: AITutorMessage[];
  startedAt: string;
  endedAt?: string;
  subject?: string;
  topic?: string;
}

export interface AIGeneratedClass {
  id: string;
  teacherId: string;
  title: string;
  subject: string;
  gradeLevel: string;
  duration: number; // in minutes
  objectives: string[];
  materials: string[];
  activities: AIGeneratedActivity[];
  assessments: string[];
  createdAt: string;
  savedToLibrary: boolean;
}

export interface AIGeneratedActivity {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  type: 'individual' | 'group' | 'class';
}

// Progress tracking
export interface StudentProgress {
  userId: string;
  courseId: string;
  overallProgress: number; // 0-100
  lastActivity: string;
  materialsCompleted: string[]; // IDs of completed materials
  assignmentsCompleted: string[]; // IDs of completed assignments
  grades: {
    assignmentId: string;
    grade: number;
  }[];
  attendance: {
    date: string;
    status: 'present' | 'absent' | 'late' | 'excused';
  }[];
}

// Analytics and metrics
export interface ClassAnalytics {
  courseId: string;
  averageGrade: number;
  highestGrade: number;
  lowestGrade: number;
  attendanceRate: number;
  assignmentCompletionRate: number;
  studentEngagement: number; // 0-100
  improvementAreas: string[];
}

// Admin types
export interface SystemMetrics {
  totalUsers: number;
  activeUsers: number;
  totalCourses: number;
  activeCourses: number;
  aiInteractions: number;
  storageUsed: number; // in bytes
  lastUpdated: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  resource: string;
  resourceId?: string;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
}

// Trinket types (rewards/badges)
export interface Trinket {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: 'achievement' | 'participation' | 'excellence' | 'custom';
  requirements: string;
  pointValue: number;
  createdAt: string;
  createdBy: string;
  isActive: boolean;
}

export interface UserTrinket {
  userId: string;
  trinketId: string;
  awardedAt: string;
  awardedBy: string;
  isDisplayed: boolean;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  pagination?: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}
