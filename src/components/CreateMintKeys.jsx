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

    const [totalShareholders, setTotalShareholders]  = useState(3);
    const [consensus, setConsensus]                  = useState(2);

    useEffect(()=>{
        // Just set the defaults and notify parent - no cookies
        props.setShareholders(3);
        props.setConsensus(2);
    },[]);

    const setShareholders = (val) => {
        setTotalShareholders(val);
        props.setShareholders(val);
        // Don't automatically set consensus to match shareholders
        // Keep existing consensus if it's still valid, otherwise set to 2
        const newConsensus = consensus > val ? 2 : consensus;
        setConsensus(newConsensus);
        props.setConsensus(newConsensus);
    };

    const updateConsensus = (val) => {
        setConsensus(val);
        props.setConsensus(val);
    };

    const setCookie = (cookieName, cookieValue) => {
        const expirationTime = 10 * 60 * 1000; // 10 minutes in milliseconds

        const cookieOptions = {
            maxAge: expirationTime,
        };

        cookies.set(cookieName, cookieValue, cookieOptions);
    };

    return (
        <div className="createMintKeysWrapper">
            <div className={'createSectionInnerWrapper'}>
                
                {/* Number of Keys Section */}
                <div className="key-config-section">
                    <h6 className="config-question">How many keys do you want to create?</h6>
                    <div className="number-selector">
                        {Array.from({length: 20}, (_, i) => i + 1).map(num => (
                            <button
                                key={num}
                                type="button"
                                className={`number-btn ${totalShareholders === num ? 'active' : ''}`}
                                onClick={() => setShareholders(num)}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                    <p className="config-help">Each key is a separate document that holds part of your vault's encryption</p>
                </div>

                {/* Threshold Section - Only show if more than 1 key */}
                {totalShareholders > 1 && (
                    <div className="key-config-section">
                        <h6 className="config-question">How many keys are needed to unlock?</h6>
                        <div className="number-selector">
                            {Array.from({length: totalShareholders - 1}, (_, i) => i + 2).map(num => (
                                <button
                                    key={num}
                                    type="button"
                                    className={`number-btn ${consensus === num ? 'active' : ''}`}
                                    onClick={() => updateConsensus(num)}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                        <p className="config-help">
                            {consensus === 2 && totalShareholders === 3 
                                ? "Recommended: You can lose 1 key and still access your vault"
                                : consensus === totalShareholders 
                                ? "High security: All keys required (risky if you lose any)"
                                : `${consensus} out of ${totalShareholders} keys will be needed`
                            }
                        </p>
                    </div>
                )}

            </div>
        </div>
    )
}

export default CreateMintKeys;


