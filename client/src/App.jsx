import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import ProtectedRoute from './components/ProtectedRoutes';
import RegisterUser from './RegisterUser';
import AddItem from './AddItem';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <RegisterUser />
            </ProtectedRoute>
          }
        />
        <Route path='/addItem' element={<ProtectedRoute><AddItem/></ProtectedRoute>}
        />
      </Routes>
    </Router>
  );
}

export default App;
