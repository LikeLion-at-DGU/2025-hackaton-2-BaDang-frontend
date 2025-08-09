import { useState } from 'react'
import Navbar from  './components/Navbar.jsx';
import MainPage from './pages/MainPage';
import OnlineReviewPage from './pages/OnlineReviewPage.jsx';
// import CustomKeywordNewsPage from './pages/CustomKeywordNewsPage.jsx';
// import CollaborationManagementPage from './pages/CollaborationManagementPage.jsx';
// import ProfileEditPage from './pages/ProfileEditPage.jsx';
import { Routes, Route, Router } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/online-review" element={<OnlineReviewPage />} />
        {/* <Route path="/custom-keyword-news" element={<CustomKeywordNewsPage />} />
        <Route path="/collaboration-management" element={<CollaborationManagementPage />} />
        <Route path="/profile-edit" element={<ProfileEditPage />} /> */}
      </Routes>

    </>
  );
}

export default App;
