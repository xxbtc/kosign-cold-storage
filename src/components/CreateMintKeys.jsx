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
import Cookies from 'universal-cookie';


function CreateMintKeys(props) {

    const cookies   = new Cookies();

    const [totalShareholders, setTotalShareholders]  = useState(2);
    const [consensus, setConsensus]                  = useState(2);

    useEffect(()=>{
        let cookieShares          = cookies.get('kosign_shares');
        let cookieThreshold       = cookies.get('kosign_threshold');
        if (cookieShares) setShareholders(cookieShares);
        if (cookieThreshold) updateConsensus(cookieThreshold);
    },[]);

    const setShareholders = (val) => {
        setTotalShareholders(val);
        props.setShareholders(val);
        setConsensus(val);
        setCookie('kosign_shares', val);
    };

    const updateConsensus = (val) => {
        setConsensus(val);
        props.setConsensus(val);
        setCookie('kosign_threshold', val);
    };

    const setCookie = (cookieName, cookieValue) => {
        const expirationTime = 10 * 60 * 1000; // 10 minutes in milliseconds

        const cookieOptions = {
            maxAge: expirationTime,
        };

        cookies.set(cookieName, cookieValue, cookieOptions);
    };

    return (
        <div>

           {/* <Lottie
                options={{
                    animationData: LottieAnimationKey,
                    loop: false
                }}
                width={350}
                height={350}
            />

            */}
            <Row style={{ height:'100%'}}>
                <Col xs={{span:12}} md={{span:12, offset:0}} lg={{span:12, offset:0}}>

                        <div className={'createSectionWrapper'}>

                            {/*<AddUserToVault addUser={(user) => this.addUser(user)}/>*/}

                            <FormGroup className={'formGroup'} controlId="formThreshold">
{/*
                                <FormLabel className={'formLabel'}>How many keys?</FormLabel>
*/}
                                <div style={{marginTop:10}}>
                                    <select className={'formSelect'} value={totalShareholders} onChange={(e) => setShareholders(e.target.value)}>
                                        {Array.apply(2, Array(20)).map((member, i) => (
                                            <option key={'selectoptionkey_'+i+1} value={i+1}>{i+1} key{i>0?'s':null}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className={'text-muted'} style={{marginTop:5}}>Each key is unique. Distribute one per person.</div>
                            </FormGroup>

                            {totalShareholders>1?
                            <FormGroup className={'formGroup'} controlId="formThreshold">
                                {/*<FormLabel className={'formLabel'}>How many keys are needed to unlock?</FormLabel>*/}
                                <div style={{marginTop:10}}>
                                    <select className={'formSelect'} value={consensus} onChange={(e) => updateConsensus( e.target.value)}>
                                        {Array.apply(2, Array(parseInt(totalShareholders)-1)).map((member, i) => (
                                            <option key={'selectoptionkey_'+i+2} value={i+2}>Require {i+2} keys to unlock</option>
                                        ))}
                                    </select>
                                    <div className={'text-muted'} style={{marginTop:5}}>Set the minimum amount of keys needed to unlock the vault.</div>

                                </div>
{/*
                                <div className={'text-muted'}>{consensus===1 ? <div>&nbsp;</div> : <div>You + {consensus-1} others will be required to unlock</div>}</div>
*/}
                            </FormGroup>
                            : null}

                            {/*<FormGroup className={'formGroup'} controlId="formSubmit" style={{marginTop:50}}>
                                <div>
                                    <Button
                                        variant = {'primary'}
                                        size    = {'lg'}
                                        onClick = {()=>props.continue()}
                                    >
                                        Continue
                                    </Button>
                                </div>
                            </FormGroup>*/}
                        </div>

                </Col>

            </Row>
        </div>
    )

}

export default CreateMintKeys;


