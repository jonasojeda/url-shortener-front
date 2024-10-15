// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import UrlList from './pages/UrlList';
import RedirectPage from './pages/Redirect';

const App: React.FC = () => {
    return (
        <Router>
            <div className="container mx-auto p-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/urls" element={<UrlList />} />
                    <Route path="/:url_key" element={<RedirectPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
