import React, {Component, useEffect, useState} from 'react'
import { Link , useNavigate} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from "../components/Layout";

import '../style/index.css';
import '../style/homepage.css';

import {Form, FormGroup, FormLabel, Button} from 'react-bootstrap';
import { FaKey, FaUnlock } from 'react-icons/fa';

import Lottie from "lottie-react-web";
import LottieAnimationKey from "../animations/6370-keys";
import Cookies from 'universal-cookie';
import { ProFeatureService } from '../services/ProFeatureService';


function CreateMintKeys(props) {

    const cookies   = new Cookies();

    const [totalShareholders, setTotalShareholders]  = useState(3);
    const [consensus, setConsensus]                  = useState(2);

    useEffect(()=>{
        // Remove hardcoded initialization - let parent handle it
        // props.setShareholders(3);  // ← Remove this line
        // props.setConsensus(2);     // ← Remove this line
    },[]);

    const setShareholders = (val) => {
        setTotalShareholders(val);
        props.setShareholders(val);
        
        // Handle consensus adjustment based on library constraints
        let newConsensus;
        if (val === 1) {
            // Single key - consensus must be 1
            newConsensus = 1;
        } else {
            // Multiple keys - secrets.js library requires minimum threshold of 2
            newConsensus = Math.max(2, Math.min(consensus, val));
        }
        
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

    // Helper function to get button styling
    const getKeyButtonStyle = (num) => {
        const cost = ProFeatureService.calculateCost(num);
        const isActive = totalShareholders === num;
        
        if (isActive) {
            return cost === 0 
                ? { borderColor: '#4caf50', backgroundColor: 'rgba(76, 175, 80, 0.2)' } // Green for free
                : { borderColor: '#1786ff', backgroundColor: 'rgba(23, 134, 255, 0.2)' }; // Blue for paid
        }
        
        return cost === 0
            ? { borderColor: 'rgba(76, 175, 80, 0.5)', backgroundColor: 'transparent' } // Green for free
            : { borderColor: 'rgba(23, 134, 255, 0.5)', backgroundColor: 'transparent' }; // Blue for paid
    };

    return (
        <div className="createMintKeysWrapper">
            <div className={'createSectionInnerWrapper'}>
                
                {/* Number of Keys Section */}
                <div className="key-config-section">
                    <h6 className="config-question" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FaKey style={{ color: '#4caf50', fontSize: '1.1rem' }} />
                        How many keys do you need?
                    </h6>
                    
                    {/* Benefit explanation */}
                    <div style={{
                        background: 'transparent',
                        padding: '0rem',
                        marginBottom: '1rem',
                        fontSize: '0.85rem',
                        textAlign: 'left',
                        color: '#b0b0b0'
                    }}>
                      We recommend creating 3 or more keys to ensure you can still access your vault if you lose a key.
                    </div>

                     {/* Pricing information */}
                     <div style={{
                        textAlign: 'left',
                        marginBottom: '1rem',
                        fontSize: '0.8rem',
                        color: '#b0b0b0'
                    }}>
                        $5 per key • First key free
                    </div>


                    <div className="number-selector">
                        {Array.from({length: 20}, (_, i) => i + 1).map(num => {
                            const cost = ProFeatureService.calculateCost(num);
                            return (
                                <button
                                    key={num}
                                    type="button"
                                    className={`number-btn ${totalShareholders === num ? 'active' : ''}`}
                                    onClick={() => setShareholders(num)}
                                    style={getKeyButtonStyle(num)}
                                    title={cost === 0 ? `${num} key${num !== 1 ? 's' : ''} (Free)` : `${num} key${num !== 1 ? 's' : ''} ($${cost})`}
                                >
                                    {num}
                                </button>
                            );
                        })}
                    </div>
                    
                   
                    
                </div>

                {/* Explanation for 2 keys */}
                {totalShareholders === 2 && (
                    <div className="key-config-section">
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '6px',
                            padding: '0.75rem',
                            fontSize: '0.85rem',
                            color: '#b0b0b0',
                            textAlign: 'center'
                        }}>
                            Both keys will be required to unlock your vault
                        </div>
                    </div>
                )}

                                        {/* Threshold Section - Only show if more than 2 keys (need actual choice) */}
                {totalShareholders > 2 && (
                    <div className="key-config-section">
                        <h6 className="config-question" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FaUnlock style={{ color: '#4caf50', fontSize: '1.1rem' }} />
                            How many keys are needed to unlock?
                        </h6>
                        <div style={{
                            background: 'transparent',
                            padding: '0rem',
                            marginBottom: '1rem',
                            fontSize: '0.85rem',
                            textAlign: 'left',
                            color: '#b0b0b0'
                        }}>
                            Lower threshold = more redundancy. Higher threshold = more security
                        </div>
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


