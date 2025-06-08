import React, { useEffect,  useState} from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../style/index.css';
import '../style/homepage.css';

import Lottie from "lottie-react-web";
import LottieAnimationLoading from "../animations/93270-password-lock-animation";
import Typewriter from 'typewriter-effect';

function CreateLoading(props) {

    const [loadingStep, setLoadingStep] = useState(1);

    useEffect(()=>{
        setTimeout(()=>{
            setLoadingStep(2);
            setTimeout(()=> {
                props.loadingComplete();
            }, 5000)
        }, 5000);
    },[]);

    // Calculate responsive animation size
    const getAnimationSize = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 480) return 200; // Small mobile
        if (screenWidth <= 768) return 250; // Tablet
        return 300; // Desktop
    };

    const animationSize = getAnimationSize();

    return (
        <div className="loading-wrapper">
            <div className={'alert alert-info loading-alert'}>
                <h2 className="loading-title">
                    {loadingStep===1?
                        <Typewriter
                            options={{
                                strings: 'Encrypting ...',
                                autoStart: true,
                                loop: false,
                            }}
                        />
                        :
                        <Typewriter
                            options={{
                                strings: 'Minting Keys ...',
                                autoStart: true,
                                loop: false,
                            }}
                        />
                        }
                </h2>
            </div>

            <div className="loading-animation-container">
                <Lottie
                    options={{
                        animationData: LottieAnimationLoading,
                        loop: false
                    }}
                    width="100%"
                    height="auto"
                />
            </div>
        </div>
    )
}

export default CreateLoading;


