import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import UploadDocuments from './pages/upload-docs';
import AISearch from './pages/ai-search';
import AllDocuments from './pages/all-documents';
import { AppSidebar } from './components/custom-ui/sidebar/app-sidebar';

const App = () => {
  return (
    <Router>
      <AppSidebar />
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/upload-doc' element={<UploadDocuments />} />
        <Route path='/ai-search' element={<AISearch />} />
        <Route path='/view-docs' element={<AllDocuments />} />
      </Routes>
    </Router>
  )
}

export default App;
