import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../style/index.css';
import '../style/homepage.css';

import Lottie from "lottie-react-web";
import LottieAnimationLoading from "../animations/93270-password-lock-animation";

function CreateLoading() {
    return (
        <Row style={{ height:'100%', alignItems:'center'}}>
            <Col xs={{span:12}} md={{span:12, offset:0}} lg={{span:12, offset:0}}>
                <div className={'createSectionWrapper'} style={{padding:30, alignItems:'center', textAlign:'center'}}>
                    <h2>Creating vault......</h2>
                    <br/><br/>
                    <div className={'animationWrapper'}>
                        <Lottie
                            options={{
                                animationData: LottieAnimationLoading,
                                loop: false
                            }}
                            width={300}
                            height={300}
                        />
                    </div>
                </div>
            </Col>
        </Row>
    )

}

export default CreateLoading;


