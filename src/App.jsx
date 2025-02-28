import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import UploadDocuments from './pages/upload-docs';
import AISearch from './pages/ai-search';
import AllDocuments from './pages/all-documents';
import { AppSidebar } from './components/custom-ui/sidebar/app-sidebar';
import Login from './pages/login';
import Signup from './pages/sign-up';
import { Toaster } from 'sonner';
import AuthState from './contexts/AuthContext';

const App = () => {
  return (
    <Router>
      <AuthState>
        <MainApp />
      </AuthState>
    </Router>
  )
}

const MainApp = () => {

  const location = useLocation();
  const checkLogin = location.pathname.startsWith('/login');
  const checkSignup = location.pathname.startsWith('/signup');

  return (
    <>
      { !checkLogin && !checkSignup && <AppSidebar /> }
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/upload-doc' element={<UploadDocuments />} />
        <Route path='/ai-search' element={<AISearch />} />
        <Route path='/view-docs' element={<AllDocuments />} />
      </Routes>
      <Toaster/>
    </>
  )
}

export default App;
