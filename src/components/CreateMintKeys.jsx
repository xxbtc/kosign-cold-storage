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

    // Get the actual free plan limit (always 3), not user's current limit
    const freeLimit = ProFeatureService.FREE_LIMITS.maxShares;

    // Helper function to get button styling
    const getKeyButtonStyle = (num) => {
        const isFree = num <= freeLimit; // This will always be num <= 3
        const isActive = totalShareholders === num;
        
        if (isActive) {
            return isFree 
                ? { borderColor: '#6c757d', backgroundColor: 'rgba(108, 117, 125, 0.2)' } // Gray (less appealing)
                : { borderColor: '#4caf50', backgroundColor: 'rgba(76, 175, 80, 0.2)' }; // Green (appealing)
        }
        
        return isFree
            ? { borderColor: 'rgba(108, 117, 125, 0.5)', backgroundColor: 'transparent' } // Gray
            : { borderColor: 'rgba(76, 175, 80, 0.5)', backgroundColor: 'transparent' }; // Green
    };

    return (
        <div className="createMintKeysWrapper">
            <div className={'createSectionInnerWrapper'}>
                
                {/* Number of Keys Section */}
                <div className="key-config-section">
                    <h6 className="config-question" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FaKey style={{ color: '#4caf50', fontSize: '1.1rem' }} />
                        How many keys do you want to create?
                    </h6>
                    <div className="number-selector">
                        {Array.from({length: 20}, (_, i) => i + 1).map(num => {
                            const isFree = num <= freeLimit;
                            return (
                                <button
                                    key={num}
                                    type="button"
                                    className={`number-btn ${totalShareholders === num ? 'active' : ''}`}
                                    onClick={() => setShareholders(num)}
                                    style={getKeyButtonStyle(num)}
                                    title={isFree ? `${num} keys (Free plan)` : `${num} keys (Pro plan required)`}
                                >
                                    {num}
                                </button>
                            );
                        })}
                    </div>
                    
                    {/* Simpler legend without sparkle */}
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'center',
                        marginTop: '0.75rem',
                        fontSize: '0.75rem'
                    }}>
                        <div style={{ color: '#6c757d', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <div style={{
                                width: '8px',
                                height: '8px',
                                backgroundColor: '#6c757d', // Gray
                                borderRadius: '50%'
                            }}></div>
                            Free (1-{freeLimit} keys)
                        </div>
                        <div style={{ color: '#4caf50', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <div style={{
                                width: '8px',
                                height: '8px',
                                backgroundColor: '#4caf50', // Green
                                borderRadius: '50%'
                            }}></div>
                            Pro ({freeLimit + 1}-20 keys)
                        </div>
                    </div>
                    
                </div>

                {/* Threshold Section - Only show if more than 1 key */}
                {totalShareholders > 1 && (
                    <div className="key-config-section">
                        <h6 className="config-question" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FaUnlock style={{ color: '#4caf50', fontSize: '1.1rem' }} />
                            How many keys are needed to unlock?
                        </h6>
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


