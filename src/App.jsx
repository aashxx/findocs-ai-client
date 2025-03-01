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
import DocsState from './contexts/DocsContext';

const App = () => {
  return (
    <Router>
      <AuthState>
        <DocsState>
          <MainApp />
        </DocsState>
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
        <Route path='/' element={<Dashboard />} />
        <Route path='/upload' element={<UploadDocuments />} />
        <Route path='/ai-search' element={<AISearch />} />
        <Route path='/view-docs' element={<AllDocuments />} />
      </Routes>
      <Toaster/>
    </>
  )
}

export default App;
