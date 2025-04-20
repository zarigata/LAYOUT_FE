// @codex
// Main application component with routing and layout
import React, { Suspense, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import NavBar from './components/NavBar';

// Lazy-loaded page components
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const TeacherDashboard = React.lazy(() => import('./pages/TeacherDashboard'));
const StudentDashboard = React.lazy(() => import('./pages/StudentDashboard'));
const AdminPortal = React.lazy(() => import('./pages/AdminPortal'));
const QuizPage = React.lazy(() => import('./pages/QuizPage'));
const AnalyticsPage = React.lazy(() => import('./pages/AnalyticsPage'));
const TutorPage = React.lazy(() => import('./pages/TutorPage'));

// Role-based private route
const PrivateRoute = ({ children, roles }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/teacher/*"
              element={<PrivateRoute roles={["TEACHER"]}><TeacherDashboard /></PrivateRoute>}
            />
            <Route
              path="/student/*"
              element={<PrivateRoute roles={["STUDENT"]}><StudentDashboard /></PrivateRoute>}
            />
            <Route
              path="/admin/*"
              element={<PrivateRoute roles={["ADMIN"]}><AdminPortal /></PrivateRoute>}
            />
            <Route
              path="/quiz/:id"
              element={<PrivateRoute roles={["TEACHER"]}><QuizPage /></PrivateRoute>}
            />
            <Route
              path="/analytics"
              element={<PrivateRoute roles={["TEACHER"]}><AnalyticsPage /></PrivateRoute>}
            />
            <Route
              path="/student/tutor"
              element={<PrivateRoute roles={["STUDENT"]}><TutorPage /></PrivateRoute>}
            />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
