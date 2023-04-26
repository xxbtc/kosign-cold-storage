import React, {useEffect} from 'react'
import { Link , useNavigate} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from "../components/Layout";

import '../style/index.css';
import '../style/homepage.css';
import {Button} from 'reactstrap';

import Container from 'react-bootstrap/Container';
import Navbar from '../components/NavbarTop';
import Footer from '../components/Footer';

function Homepage() {

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Layout>
            <Navbar />

            <div className={'homepageHero'}>
                <Container>
                    <Row>
                        <Col xs={{span:12}} md={{span:12, offset:0}} lg={{span:8, offset:2}}>
                            <div className={'homepageH1'}>
                                <div className={'homepageH1pretitle'}>Your Forever Vault</div>
                                <div className={'actualTitle'}>
                                    <div>Cold Storage With Social Recovery</div>
                                </div>
                            </div>



                            
                        </Col>

                    </Row>
                </Container>
            </div>


            <Footer />
        </Layout>
    );

}

export default Homepage;


