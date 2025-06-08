import React, {Component, useEffect, useState} from 'react'
import { Link , useNavigate} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from "../components/Layout";

import '../style/index.css';
import '../style/homepage.css';
import '../style/pricing.css';

import {Button} from 'react-bootstrap';
//import {FaTelegram, FaTwitter} from 'react-icons/fa';

import Container from 'react-bootstrap/Container';
import Navbar from '../components/NavbarTop';
import Footer from '../components/Footer';
import HomepagePricing from '../components/HomepagePricing';

import {MdCancel} from 'react-icons/md';
import {FaCheck} from 'react-icons/fa';
import Cookies from 'universal-cookie';
import {FaTwitter, FaMedium} from 'react-icons/fa';
import { ProFeatureService } from '../services/ProFeatureService';

function PricingPage() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isProUser, setIsProUser] = useState(false);

    useEffect(() => {
        setIsProUser(ProFeatureService.isProUser());
    }, []);

    return (
        <Layout>
            <Navbar loggedIn={isLoggedIn}/>

            <div className={'pageLayout pricingPageWrapper'}>
                
                
                <HomepagePricing />
            </div>

            <Footer/>
        </Layout>
    )
}

export default PricingPage;

