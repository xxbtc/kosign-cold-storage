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
import { QrReader } from 'react-qr-reader';

import {AiOutlineQrcode} from 'react-icons/ai';
import {ImKey} from 'react-icons/im';
import {FaChevronRight, FaLock, FaLockOpen} from 'react-icons/fa';

import Lottie from 'lottie-react-web'
import LottieAnimation from '../animations/5427-scan-qr-code.json'
import LottieAnimationSuccess  from '../animations/97240-success'
import {Oval} from 'react-loading-icons';

import CreateVault from "../components/CreateVault";
import {PaymentService} from "../services/PaymentService";
import Footer from "../components/Footer";
import Cookies from 'universal-cookie';
import { ProFeatureService } from '../services/ProFeatureService';

function CreatePage() {
    const navigate = useNavigate();
    const cookies = new Cookies();

    const [paymentComplete, setPaymentComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showProAlert, setShowProAlert] = useState(false);

    useEffect(() => {
        // Check if user came from successful payment
        const purchaseData = localStorage.getItem('kosign_pro_purchase');
        if (purchaseData) {
            try {
                const data = JSON.parse(purchaseData);
                if (data.licenseKey && !ProFeatureService.isProUser()) {
                    // Auto-activate license if we have it from payment
                    ProFeatureService.activateLicense(data.licenseKey).then(() => {
                        setShowProAlert(true);
                        localStorage.removeItem('kosign_pro_purchase'); // Clean up
                    });
                }
            } catch (e) {
                console.warn('Invalid purchase data', e);
            }
        }
    }, []);

    const handleUpgradeClick = () => {
        navigate('/payment');
    };

    const handleLicenseActivated = (features) => {
        setShowProAlert(true);
    };

    return (
        <Layout>
            <Navbar loggedIn={false}/>
           
            <CreateVault 
                isLoading={isLoading} 
                paymentComplete={paymentComplete}
            />
            
            <Footer/>
        </Layout>
    )
}

export default CreatePage;


