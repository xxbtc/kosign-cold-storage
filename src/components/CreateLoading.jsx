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

    return (

        <div className={'createSectionWrapper'} style={{marginTop:30,alignItems:'center', textAlign:'center'}}>

            <div className={'alert alert-info'}>
                <h2>
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

    )

}

export default CreateLoading;


