import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from "../components/Layout";
import {Container,  Button, Modal} from 'react-bootstrap';
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


function CreatePage() {

    const navigate = useNavigate();
    const cookies   = new Cookies();

    const [paymentComplete, setPaymentComplete] = useState(false);
    const [isLoading, setIsLoading]             = useState(true);

    // useEffect(()=>{
    //     const queryString = window.location.search;

    //     // Create a new URLSearchParams object from the query string
    //     const params = new URLSearchParams(queryString);
    //     // Retrieve the values using the parameter names
    //     const productId             = params.get('product_id');
    //     const product_permalink     = params.get('product_permalink');
    //     const sale_id               = params.get('sale_id');
    //     if (!productId || !sale_id) {
    //         setIsLoading(false);
    //         return;

    //         //console.log('wno prodicut id or saleid...');
    //     }
    //     //we are here because we were redirected from gumroad after a payment
    //     //console.log('welcome back from gumroad...');
    //     PaymentService.setupGumroadPayment(productId, sale_id).then((response)=>{
    //         //console.log('setupGumroadPayment', response);
    //         setPaymentComplete(true);
    //         setIsLoading(false);
    //         setCookie('kosign_sale_id', sale_id);
    //         setCookie('kosign_product_id', productId);
    //         //alert ('apyment succeeded');
    //     }).catch(error => {
    //         alert ('Payment Error');
    //         setPaymentComplete(false);
    //         setIsLoading(false);
    //         navigate('/');
    //         //console.log('payment intent ERROR');
    //         console.log(error.response.data);
    //         console.log(error.response.status);
    //         console.log(error.response.headers);
    //     });
    // },[]);

    // const setCookie = (cookieName, cookieValue) => {
    //     const expirationTime = 120 * 60 * 1000; // 120 minutes in milliseconds

    //     const cookieOptions = {
    //         maxAge: expirationTime,
    //     };

    //     cookies.set(cookieName, cookieValue, cookieOptions);
    // };

    return (
        <Layout>
            <Navbar loggedIn/>
            <div className={'pageWrapper'}>
                <Container>
                    <Row>
                        <Col xs={{span: 12, offset: 0}} md={{span: 12, offset: 0}} lg={{span: 8, offset: 2}}>
                            <div className={'pageNavWrapper'}>
                                <div>
                                    <h2 className={'pageTitle'}>Create a vault</h2>
                                </div>

                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={{span: 12, offset: 0}} md={{span: 12, offset: 0}} lg={{span: 8, offset: 2}}>
                            <CreateVault isLoading={isLoading} paymentComplete={paymentComplete} />
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer/>
        </Layout>
    )

}

export default CreatePage;


