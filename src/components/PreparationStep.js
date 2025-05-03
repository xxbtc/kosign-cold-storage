import React from 'react';
import { Button } from 'react-bootstrap';
import { 
    FaShieldAlt, 
    FaWifi,
    FaCheck,
    FaChevronRight,
    FaQrcode,
    FaKey,
    FaUserSecret 
} from 'react-icons/fa';

const PreparationStep = ({ isOnline, onContinue }) => {
    return (
        <div className="preparation-content">
            <div className="preparation-header">
                <div className="header-icon">
                    <FaShieldAlt />
                </div>
                <h3>Unlock Ceremony</h3>
                <p className="header-subtitle">Before you begin, please ensure you have the following items ready</p>
            </div>

            <div className="checklist-container">
                <div className="checklist-item">
                    
                    <div className="checklist-content">
                        <div className="checklist-header">
                            <FaQrcode className="checklist-icon" />
                            <h5>
                                Encrypted Vault
                            </h5>
                        </div>
                        <p className="checklist-description">
                            Have your encrypted vault page(s) ready. 
                        </p>
                    </div>
                </div>

                <div className="checklist-item">
                    
                    <div className="checklist-content">
                        <div className="checklist-header">
                            <FaKey className="checklist-icon" />
                            <h5>Keys</h5>
                        </div>
                        <p className="checklist-description">
                            You will need to have enough keys to meet the unlock threshold. 
                        </p>
                    </div>
                </div>

                <div className="checklist-item">
                   
                    <div className="checklist-content">
                        <div className="checklist-header">
                            <FaUserSecret className="checklist-icon" />
                            <h5>Secure Location</h5>
                        </div>
                        <p className="checklist-description">
                            Find a private location away from cameras or onlookers.
                        </p>
                    </div>
                </div>
            </div>

            <div className="connection-status-wrapper">
                <div className={`connection-status ${isOnline ? 'warning' : 'success'}`}>
                    <div className="status-indicator">
                        {isOnline ? (
                            <div className="warning-animation">
                                <FaWifi />
                            </div>
                        ) : (
                            <div className="pulse-animation">
                                <FaCheck />
                            </div>
                        )}
                    </div>
                    <div>
                        {isOnline ? (
                            <strong>Warning: It seems you are currently online</strong>
                        ) : (
                            <strong>Perfect! You're offline and ready</strong>
                        )}
                        <p className="mb-0">
                            {isOnline 
                                ? 'You should disconnect from all networks before proceeding (turn off wifi / mobile data)'
                                : 'You can safely proceed with the unlock process'
                            }
                        </p>
                    </div>
                </div>
            </div>

            <div className="action-section">
                <Button
                    variant="primary"
                    onClick={onContinue}
                    className="continue-button"
                >
                    <span className="button-content">
                        Continue
                        <FaChevronRight style={{fontSize: '14px'}} />
                    </span>
                </Button>
            </div>
        </div>
    );
};

export default PreparationStep; 