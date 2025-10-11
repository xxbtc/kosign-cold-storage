import React, {useEffect} from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'
import { SensitiveModeProvider } from './contexts/SensitiveModeContext';

import HomePageNew from './pages/HomePageNew';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/layout.css';
import UnlockPage from "./pages/UnlockPage";
import CreatePage from "./pages/CreatePage";
import LegalPage from "./pages/LegalPage";
import PrivacyPage from "./pages/PrivacyPage";

function App() {
    let location = useLocation();
    
    useEffect(() => {
        let pageTitle = 'Cold Storage Vault for Digital Assets and Passwords';
        if (location.pathname.split("/")[1]) {
            let tmpTitle = location.pathname.split("/")[1]; //without the "/"
            pageTitle = tmpTitle.charAt(0).toUpperCase() + tmpTitle.slice(1)
        }
        document.title = 'Kosign - '+pageTitle;
    }, [location]);

    return (
        <SensitiveModeProvider>
            <Routes>
                <Route exact path="/" element={<HomePageNew/>}/>
                {/* <Route exact path="/thankyou" element={<HomePageNew/>}/> */}
                <Route exact path="/create" element={<CreatePage/>}/>

                <Route exact path="/unlock" element={<UnlockPage/>}/>
                <Route exact path="/legal" element={<LegalPage />}/>
                <Route exact path="/privacy" element={<PrivacyPage />}/>


            </Routes>
        </SensitiveModeProvider>
    );
}

export default App;
