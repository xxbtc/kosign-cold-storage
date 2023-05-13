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


function CreatePage() {

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
                            <CreateVault paymentComplete={true} />
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer/>
        </Layout>
    )

}

export default CreatePage;


