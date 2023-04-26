import React, {} from 'react';
import {Routes, Route} from 'react-router-dom'

import HomePage from './pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreatePage from "./pages/CreatePage";
import RecoverPage from "./pages/RecoverPage";

function App () {

    return (
        <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route exact path="/create" element={<CreatePage/>}/>
            <Route exact path="/recover" element={<RecoverPage/>}/>
        </Routes>
    );
}

export default App;
