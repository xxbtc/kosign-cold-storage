import React, {Component, useEffect, useState} from 'react'
import { Link , useNavigate} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from "../components/Layout";

import '../style/index.css';
import '../style/homepage.css';

import {Form, FormGroup, FormLabel, Button} from 'react-bootstrap';

import Lottie from "lottie-react-web";
import LottieAnimationKey from "../animations/6370-keys";


function CreateMintKeys(props) {

    const [totalShareholders, setTotalShareholders]  = useState(2);
    const [consensus, setConsensus]                  = useState(2);

    const setShareholders = (val) => {
        setTotalShareholders(val);
        props.setShareholders(val);
        setConsensus(val);
    };

    const updateConsensus = (val) => {
        setConsensus(val);
        props.setConsensus(val);
    };


    return (
        <div>
            <Row style={{ height:'100%'}}>
                <Col xs={{span:12}} md={{span:5, offset:0}} lg={{span:5, offset:0}}>
                    <div className={'animationWrapper'}>
                        <Lottie
                            options={{
                                animationData: LottieAnimationKey,
                                loop: false
                            }}
                            width={350}
                            height={350}
                        />
                    </div>
                </Col>
                <Col xs={{span:12}} md={{span:7, offset:0}} lg={{span:7, offset:0}}>


                    <Form>
                        <div className={'createSectionWrapper'}>

                            {/*<AddUserToVault addUser={(user) => this.addUser(user)}/>*/}
                            <div style={{fontSize: 40}}>
                                <h2>Quorum Settings</h2>
                            </div>
                            <FormGroup className={'formGroup'} controlId="formThreshold">
                                <FormLabel className={'formLabel'}>Total keys including yours:</FormLabel>
                                <div style={{marginTop:10}}>
                                    <select className={'formSelect'} value={totalShareholders} onChange={(e) => setShareholders(e.target.value)}>
                                        {Array.apply(2, Array(19)).map((member, i) => (
                                            <option key={'selectoptionkey_'+i+2} value={i+2}>{i+2}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className={'text-muted'}>{totalShareholders===1 ? <div>&nbsp;</div> : <div>You + {totalShareholders-1} others</div>}</div>
                            </FormGroup>

                            <FormGroup className={'formGroup'} controlId="formThreshold" style={{marginTop:20}}>
                                <FormLabel className={'formLabel'}>How many keys are required to unlock?</FormLabel>
                                <div style={{marginTop:10}}>
                                    <select className={'formSelect'} value={consensus} onChange={(e) => updateConsensus( e.target.value)}>
                                        {Array.apply(1, Array(parseInt(totalShareholders)-1)).map((member, i) => (
                                            <option key={'selectoptionkey_'+i+2} value={i+2}>{i+2}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className={'text-muted'}>{consensus===1 ? <div>&nbsp;</div> : <div>You + {consensus-1} others</div>}</div>
                            </FormGroup>

                            <FormGroup className={'formGroup'} controlId="formSubmit" style={{marginTop:50}}>
                                <div>
                                    <Button
                                        variant = {'primary'}
                                        size    = {'lg'}
                                        onClick = {()=>props.createVault()}
                                    >
                                        Continue
                                    </Button>
                                </div>
                            </FormGroup>
                        </div>
                    </Form>
                </Col>

            </Row>
        </div>
    )

}

export default CreateMintKeys;


