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
        let cookieShares          = cookies.get('kosign_shares');
        let cookieThreshold       = cookies.get('kosign_threshold');
        //console.log('thecookiesare', cookieShares, cookieThreshold);
        if (cookieShares) {
            setShareholders(cookieShares);
            setTotalShareholders(cookieShares);
        } else {
            // Set defaults for new users
            setShareholders(3);
            setTotalShareholders(3);
        }
        if (cookieThreshold) {
            updateConsensus(cookieThreshold);
        } else {
            // Set default threshold for new users
            updateConsensus(2);
        }
    },[]);

    const setShareholders = (val) => {
        setTotalShareholders(val);
        props.setShareholders(val);
        setConsensus(val);
        setCookie('kosign_shares', val);
        setCookie('kosign_threshold', val);
        //console.log('setting the cookie to ', val);
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


