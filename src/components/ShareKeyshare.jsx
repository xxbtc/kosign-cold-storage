import React, {useState} from 'react'
import { Link} from 'react-router-dom'

import '../style/index.css';
import '../style/forms.css';
import '../style/createPage.css';

import KeyshareSecret from '../components/KeyshareSecret';
import ShareKeySplashScreen from '../components/ShareKeySplashScreen'

function ShareKeyshare(props) {

    const [vaultIdent, setVaultIdent]           = useState([]);
    let [activeSlide, setActiveSlide]           = useState(1);
    let [showSplashScreen, setShowSplashScreen] = useState(true);

    const nextKey = () => {
        if (activeSlide>=props.shares.length-1) {
            alert ('no more keys');
            return;
        }
        setActiveSlide(activeSlide+1);
    };


    if (showSplashScreen) {
        return <ShareKeySplashScreen continue={()=>setShowSplashScreen(false)} />;
    }

    return (

    <div>
        <div className={'createSectionWrapper'}>
           {props.shares.map((member, i) => {
           return (

               <div>
                   <KeyshareSecret key={'keysharex_'+i} keyshare={props.shares[i]} vaultIdent={vaultIdent} i={i} nextKey={()=>nextKey()} {...props} />
               </div>
           );
           })}

            <div className={'alert alert-info'}>
                Once you've downloaded and shared the keys with your key guardians, you're done! You can also <Link to={'/recover'}>test vault recovery</Link> before sending the keys.
            </div>
        </div>
   </div>
    )

}

export default ShareKeyshare;
