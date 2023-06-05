import React, {useEffect, useRef} from 'react'
import { Link , useNavigate, useLocation, useSearchParams, useParams} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from "../components/Layout";

import '../style/index.css';
import '../style/homepage.css';
import {Button} from 'react-bootstrap';

import Container from 'react-bootstrap/Container';
import Navbar from '../components/NavbarTop';
import Footer from '../components/Footer';
import CreateVault from "../components/CreateVault";
import {PaymentService} from "../services/PaymentService";
import Lottie from 'lottie-react-web';
import LottieAnimationUnlock from '../animations/using-key-to-unlock';

import layerWaves from '../images/layer-waves.svg';
import layerPeaks from '../images/wave-haikei.svg';
import {BsArrowReturnRight} from 'react-icons/bs';
import paperVault from '../images/papervault.jpg';
import personWithLock from '../images/personwithlock.png';
import printerqr from '../images/printerqr.png';
import peoplepaper from '../images/peoplepaper.png';

import groupQR from '../images/groupqr.png';


import HomepageUseCases from '../components/HomepageUseCases';
import HomepageFAQ from '../components/HomepageFAQ';
import HomepageReasons from '../components/HomepageReasons';
import HomepageTestimonials from '../components/HomepageTestimonials';
import {FaCheck} from 'react-icons/fa';
import Cookies from "universal-cookie";
import {FaTwitter, FaMedium} from 'react-icons/fa';


function Homepage(props) {

    const navigate = useNavigate();
    const cookies   = new Cookies();


    const pricingRef = useRef(null);


    /* const navigate = useNavigate();
     const location = useLocation();

     const [searchParams, setSearchParams] = useSearchParams();
     const payment_intent                = searchParams.get("payment_intent");
     const payment_intent_client_secret  = searchParams.get("payment_intent_client_secret");

     if (payment_intent) {
         console.log('payment recevied');
         PaymentService.getIntent(payment_intent_client_secret).then((response)=>{
             console.log('payment intent response is ', response);
         }).catch(error => {
             console.log('payment intent response ERROR');
             console.log(error.response.data);
             console.log(error.response.status);
             console.log(error.response.headers);
         });
     }
 */

    useEffect(() => {
        if (props.showPricing){
            pricingRef.current.scrollIntoView();
            return;
        }
        window.scrollTo(0, 0);

        cookies.remove('kosign_vaultname');
        cookies.remove('kosign_threshold');
        cookies.remove('kosign_shares');
        cookies.remove('kosign_vaultdescription');

    }, [props]);

    return (
        <Layout>
            <Navbar />

            <div className={'homepageHero'}>
                <Container>

                        <div className={'homepageH1'}>

                            <div className={'homepageH1Inner'}>
                                <div className={'homepageH1pretitle'}>Multi-signature cold storage</div>
                                <div className={'actualTitle'}>
                                    <div>Backup your passwords on a paper data vault</div>
                                </div>
                                <div className={'heroSubtitle'}>
                                    <div>
                                        Backup your passwords on a paper-based cold storage
                                        vault with distributed keys and social recovery.
                                        {/*Secure enough that you can frame it on your wall.*/}
                                    </div>
                                </div>

                                <div>
                                    <div className={'featureChecklist'}>
                                        <div className={'featureCheckWrapper'}>
                                            <FaCheck className={'featureCheck'} /> 100% offline backup
                                        </div>
                                        <div className={'featureCheckWrapper'}>
                                            <FaCheck className={'featureCheck'} /> Keep it forever
                                        </div>
                                        <div className={'featureCheckWrapper'}>
                                            <FaCheck className={'featureCheck'} /> Social recovery
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <Button
                                        size    = {'lg'}
                                        variant = {'link'}
                                        onClick = {()=>navigate('/create')}
                                        className={'primaryActionButton'}
                                    >
                                        Create a vault
                                    </Button>
                                </div>
                            </div>

                            <div className={'rightHomepage'}>
                                <div className={'rightHomepageInner'}>
                                    <img src={peoplepaper} />
                                </div>
                            </div>

                            {/*<CreateVault paymentComplete={true} />*/}

                        </div>
                </Container>
            </div>

            <div style={{position:'relative', marginTop:-50}}>
                <img src={layerPeaks} style={{width:'100%', marginBottom:-2}}  />
            </div>

            <HomepageUseCases/>

            <div style={{position:'relative', marginTop:-70, marginBottom:-3}}>
                <img src={layerPeaks} style={{width:'100%'}} className={'flipImage'} />
            </div>

            <HomepageReasons/>


            {/*<div className={'homepageThreeFeaturesRow'}>
                <Container style={{zIndex:100, position:'relative'}}>
                    <div className={'bigFeatureTitle'}>Easy to setup social recovery</div>
                    <Row>
                        <Col className={'featureCol'} xs={{span:12, offset:0}} md={{span:4, offset:0}} lg={{span:4, offset:0}}>
                            <div className={'featureClass'}>
                                <div>
                                    <span className={'featureNumber'}>
                                        1
                                    </span>
                                </div>
                                <div className={'featureTitle'}>Store secret stuff</div>
                                <div className={'featureText'}>
                                    Store passwords, digital assets, and other secret data in your vault.
                                </div>
                                <div className={'featureTextAdditional'}>
                                    <BsArrowReturnRight />  100% offline
                                </div>
                                <div className={'featureTextAdditional'}>
                                    <BsArrowReturnRight />  A strong encryption key is generated in your browser to lock your vault.
                                </div>
                            </div>
                        </Col>
                        <Col className={'featureCol'} xs={{span:12, offset:0}} md={{span:4, offset:0}} lg={{span:4, offset:0}}>
                            <div className={'featureClass'}>
                                <div>
                                    <span className={'featureNumber'}>
                                        2
                                    </span>
                                </div>
                                <div className={'featureTitle'}>Share keys</div>
                                <div className={'featureText'}>
                                    Distribute keys to delegates, and set the minimum number of keys required to unlock.
                                </div>
                                <div className={'featureTextAdditional'}>
                                    <BsArrowReturnRight /> For example 5-out-of-20 keys
                                </div>
                            </div>
                        </Col>
                        <Col className={'featureCol'} xs={{span:12, offset:0}} md={{span:4, offset:0}} lg={{span:4, offset:0}}>
                            <div className={'featureClass'}>
                                <div>
                                    <span className={'featureNumber'}>
                                        3
                                    </span>
                                </div>
                                <div className={'featureTitle'}>Unlock</div>
                                <div className={'featureText'}>
                                    Key guardians gather to unlock and recover contents.
                                </div>
                                <div className={'featureTextAdditional'}>
                                    <BsArrowReturnRight /> Your vault policy determines who can recover contents without you.
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>*/}

            {/*<div style={{position:'relative', marginBottom:-10}}>
                <img src={layerWaves} style={{width:'100%'}}  />
            </div>*/}

            <HomepageTestimonials/>

            <div  className={'homepagePricingRow'} style={{paddingTop:40, paddingLeft:70, paddingRight:70}}>
                <div ref={pricingRef} style={{fontWeight:'bold'}}>${global.setupCost} per vault + ${global.costPerKey} per key</div>
               {/* <div style={{marginTop:20}}>
                    <span className={'alert alert-info'} style={{fontSize:18}}><b>FREE</b> beta</span>
                </div>*/}

                <div className={'alert alert-warning'} style={{marginTop:20, fontSize:'1.2rem', display:'inline-block'}}>
                    <b><FaTwitter style={{color:'#00acee'}} /> We're building our twitter account!</b>
                    <div>
                        Follow and DM&nbsp;<a href={'https://twitter.com/kosign_xyz'} target={'_blank'} className={'linkage'}>@kosign_xyz</a>&nbsp;
                        to get a free $50 coupon code.
                    </div>
                </div>
            </div>

            <Row>
                <Col xs={{span:12, offset:0}} md={{span:12, offset:0}} lg={{span:12, offset:0}} style={{textAlign:'center', marginTop:30, marginBottom:60}}>
                    <Button
                        variant = {'primary'}
                        size    = {'lg'}
                        onClick = {()=>navigate('/create')}
                        className={'bottomActionButton'}
                    >
                        Create a vault
                    </Button>
                </Col>
            </Row>


            <div style={{position:'relative', marginTop:-50}}>
                <img src={layerPeaks} style={{width:'100%', marginBottom:-2}}  />
            </div>


            <Row  style={{backgroundColor:'#1786ff'}}>
                <div className={'homepageUseCasesRow'}>
                    <div className={'rowTitle'} style={{color:'#fff'}}>See a demo</div>
                    <Col xs={{span:12, offset:0}} md={{span:12, offset:0}} lg={{span:12, offset:0}} style={{textAlign:'center', marginTop:30, marginBottom:60}}>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/3gF414HSJFQ"
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen></iframe>
                    </Col>
                </div>
            </Row>

            <div style={{position:'relative', marginTop:-70, marginBottom:-3}}>
                <img src={layerPeaks} style={{width:'100%'}} className={'flipImage'} />
            </div>





            <HomepageFAQ/>

            <Footer />
        </Layout>
    );

}

export default Homepage;


