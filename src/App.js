import React, {useEffect} from 'react';
import {Routes, Route, useLocation} from 'react-router-dom'
import './Global';

import HomePage from './pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import UnlockPage from "./pages/UnlockPage";
import CreatePage from "./pages/CreatePage";
import TestPage from "./pages/TestPage";
import LegalPage from "./pages/LegalPage";
import PricingPage from "./pages/PricingPage";
import ReactGA from 'react-ga4';

function App () {
    let location = useLocation();
    ReactGA.initialize('G-SP2H0SLS82');

    useEffect(() => {
        let pageTitle = 'Multi-signature paper vaults';
        if (location.pathname.split("/")[1]) {
            let tmpTitle = location.pathname.split("/")[1]; //without the "/"
            pageTitle = tmpTitle.charAt(0).toUpperCase() + tmpTitle.slice(1)
        }
        document.title = 'Kosign - '+pageTitle;
        ReactGA.send({hitType: 'pageview', page: window.location.pathname + window.location.search});
    }, [location]);

    return (
        <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route exact path="/thankyou" element={<HomePage/>}/>
            <Route exact path="/create" element={<CreatePage/>}/>

            <Route exact path="/unlock" element={<UnlockPage/>}/>
            <Route exact path="/pricing" element={<PricingPage />}/>

            <Route exact path="/test" element={<TestPage showPricing={true}/>}/>

            <Route exact path="/legal" element={<LegalPage />}/>


        </Routes>
    );
}

export default App;
