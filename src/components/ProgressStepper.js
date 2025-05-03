import React from 'react';
import { FaCheck } from 'react-icons/fa';
import '../style/unlockPage.css';

const STEPS = [
    {
        number: 1,
        title: "Preparation"
    },
    {
        number: 2,
        title: "Scan QR Codes"
    },
    {
        number: 3,
        title: "View Contents"
    }
];

const ProgressStepper = ({ currentStep, unlocked }) => {
    return (
        <div className="progress-stepper">
            {STEPS.map((step, index) => (
                <div 
                    key={step.number}
                    className={`stepper-step ${
                        index + 1 <= currentStep || (index + 1 === 3 && unlocked) ? 'active' : ''
                    }`}
                >
                    <div className="step-circle">
                        {(index + 1 < currentStep || (index + 1 === 3 && unlocked)) ? (
                            <FaCheck />
                        ) : (
                            step.number
                        )}
                    </div>
                    <div className="step-content">
                        <div className="step-title">{step.title}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProgressStepper; 