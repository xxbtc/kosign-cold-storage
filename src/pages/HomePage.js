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
                                <div className={'homepageH1pretitle'}>Kosign</div>
                                <div className={'actualTitle'}>
                                    <div>Cold Storage With Social Recovery</div>
                                </div>
                            </div>

                            <div className={'alert alert-info'} style={{textAlign:'center', marginTop:30}}>
                                Kosign is free open source software. <a href='https://github.com/xxbtc/kosign-coldstorage'>Download and run it</a> from your offline device.
                            </div>

                            <div style={{marginTop:20, textAlign:'center'}}>
                                <div style={{display:'flex',flexDirection:'row', justifyContent:'center', alignItems:'center', paddingTop:30}}>
                                    <div>
                                        <Button
                                            variant={'primary'}
                                            size={'lg'}
                                            onClick={() => navigate('/create')}
                                        >
                                            Create vault
                                        </Button>
                                    </div>
                                    <div style={{padding:4}}>
                                        &nbsp; or &nbsp;
                                    </div>
                                    <div>
                                        <Button
                                            variant={'link'}
                                            size={'lg'}
                                            onClick={() => navigate('/recover')}
                                        >
                                            Recover backup
                                        </Button>
                                    </div>
                                </div>

                            </div>

                            <div style={{marginTop:300, textAlign:'center'}}>

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


