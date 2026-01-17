import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from "../components/Layout";
import {Container, Button, Modal, Alert} from 'react-bootstrap';
import {EncryptionService} from "../services/EncryptionService";

import '../style/index.css';
import '../style/createPage.css';
import '../style/forms.css';

import Navbar from "../components/NavbarTop";


import {AiOutlineQrcode} from 'react-icons/ai';
import {ImKey} from 'react-icons/im';
import {FaChevronRight, FaLock, FaLockOpen} from 'react-icons/fa';

import Lottie from 'lottie-react-web'
import LottieAnimation from '../animations/5427-scan-qr-code.json'
import LottieAnimationSuccess  from '../animations/97240-success'
import {Oval} from 'react-loading-icons';

import CreateVault from "../components/CreateVault";
import Footer from "../components/Footer";
import AISummarySection from "../components/AISummarySection";
import Cookies from 'universal-cookie';

function CreatePage() {
    const navigate = useNavigate();
    const cookies = new Cookies();

    const [isLoading, setIsLoading] = useState(false);

    return (
        <Layout>
            <Navbar loggedIn={false}/>
           
            <CreateVault 
                isLoading={isLoading}
            />
            
            <AISummarySection />
            <Footer/>
        </Layout>
    )
}

export default CreatePage;


