import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './page/HomePage';
import FormPage from './page/FormPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/form" element={<FormPage />} />
                <Route path="/form/:id" element={<FormPage />} />
            </Routes>
        </Router>
    );
}

export default App;
