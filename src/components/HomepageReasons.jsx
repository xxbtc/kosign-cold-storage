import React, { Component, useState, useEffect, useRef } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../style/index.css';
import '../style/homepage.css';

import Container from 'react-bootstrap/Container';
import Lottie from 'lottie-react-web'
import LottieAnimationVault from '../animations/31217-vault'
import LottieAnimationKey from '../animations/6370-keys'
import LottieAnimationUnlock from '../animations/using-key-to-unlock'
import LottieAnimationPaper from '../animations/paper-tray'

import paperVault from '../images/papervault.jpg';
import personWithLock from '../images/personwithlock.png';
import printerqr from '../images/printerqr.png';
import groupQR from "../images/groupqr.png";

function HomepageReasons(props) {
    const navigate                   = useNavigate();

    const [isVisibleReason1, setIsVisibleReason1] = useState(false);
    const [isVisibleReason2, setIsVisibleReason2] = useState(false);
    const [isVisibleReason3, setIsVisibleReason3] = useState(false);
    const [isLoading, setIsLoading]               = useState(false);


    const refTop = useRef();

    const refReason1 = useRef();
    const refReason2 = useRef();
    const refReason3 = useRef();



    /*useEffect(() => {
        const observer0 = new IntersectionObserver((entries, observer) => {
            const entry = entries[0];
            //    console.log('zerrroeoor');
            setIsVisibleReason1(true);
            setIsVisibleReason2(true);
            setIsVisibleReason3(true);
        });

        const observer1 = new IntersectionObserver((entries, observer) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                setIsVisibleReason1(false);
            }
        });
        const observer2 = new IntersectionObserver((entries, observer) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                //    console.log('setititt');
                if (isLoading) return;
                setIsLoading(true);
                setTimeout(()=>{
                    setIsVisibleReason2(true);
                    setIsVisibleReason2(false);
                }, 500)
            }
        });

        const observer3 = new IntersectionObserver((entries, observer) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
             //   console.log('setititt');
                if (isLoading) return;
                setIsLoading(true);
                setTimeout(()=>{
                    setIsVisibleReason3(true);
                    setIsVisibleReason3(false);
                }, 5000)



            }
        });

        observer0.observe(refTop.current);

        observer1.observe(refReason1.current);
        observer2.observe(refReason2.current);
      //  observer3.observe(refReason3.current);



    }, []);*/

    return (
        <div ref={refTop} className={'homepageReasonsRow'}>
            <Container>
                {/*<Row>
                    <Col xs={{span:12, offset:0}} md={{span:12, offset:0}} lg={{span:12, offset:0}}>
                        <div className={"rowTitle"}>
                            Why Kosign
                        </div>
                    </Col>
                </Row>*/}
                <div  ref={refReason1} className={"homepageReason"}>
                    <Row>
                        <Col xs={{span:12, offset:0}} md={{span:6, offset:0}} lg={{span:6, offset:0}}>
                            <div className={'homepageReasonText'}>
                                <div>1. Create a vault</div>
                                <p>
                                    Create your encrypted vault securely (100% offline!).
                                    Print it out and keep copies in different locations.
                                    Don't worry, nobody can open the vault without the keys.
                                </p>
                            </div>
                        </Col>
                        <Col xs={{span:12, offset:0}} md={{span:6, offset:0}} lg={{span:6, offset:0}}>
                            <div className={'homepageReasonImage'} style={{paddingTop:40}}>
                                {/*<Lottie
                                    options={{
                                        animationData: LottieAnimationPaper,
                                        loop: false,
                                        autoplay: true,
                                    }}
                                    style={{maxHeight:500}}
                                    width={400}
                                    height={400}
                                />*/}

                                <img src={printerqr} style={{height:'100%', width:'100%'}}/>

                            </div>
                        </Col>
                    </Row>
                </div>

                <div ref={refReason2} className={"homepageReason"}>
                    <Row>
                        <Col xs={{span:12, offset:0}} md={{span:6, offset:0}} lg={{span:6, offset:0}}  className={'order-sm-last'}>
                            <div className={'homepageReasonText'}>
                                <div>2. Mint keys</div>
                                <p>
                                    Distribute up to 20 keys to trusted individuals,
                                    and set how many are needed to unlock the vault,
                                    e.g. 5-out-of-20.
                                    Social recovery ensures you can access your vault even if you lost your key.
                                </p>
                            </div>
                        </Col>
                        <Col xs={{span:12, offset:0}} md={{span:6, offset:0}} lg={{span:6, offset:0}} >
                            <div className={'homepageReasonImage'}>
                                <img src={groupQR} style={{height:'100%', width:'100%'}}/>

                                {/*<Lottie
                                    options={{
                                        animationData: LottieAnimationUnlock,
                                        loop: false,
                                        autoplay: true,
                                    }}
                                    isStopped={isVisibleReason3}

                                    width={'100%'}
                                    height={'100%'}
                                />*/}
                            </div>
                        </Col>

                    </Row>
                </div>

                {/*<div ref={refReason3} className={"homepageReason"}>
                    <Row>
                        <Col xs={{span:12, offset:0}} md={{span:6, offset:0}} lg={{span:6, offset:0}} >
                            <div className={'homepageReasonText'}>
                                <div>Your future</div>
                                <p>
                                    Enable your trusted delegates to securely recover your data

                                </p>
                            </div>
                        </Col>
                        <Col xs={{span:12, offset:0}} md={{span:6, offset:0}} lg={{span:6, offset:0}}>
                            <div className={'homepageReasonImage'}>
                                <Lottie
                                    options={{
                                        animationData: LottieAnimationVault,
                                        loop: true,
                                    }}
                                    width={400}
                                    height={400}
                                    isStopped={isVisibleReason1}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>*/}

            </Container>
        </div>

    )

}

export default HomepageReasons;
