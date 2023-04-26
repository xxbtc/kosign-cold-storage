import React, { } from 'react'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {Button} from 'react-bootstrap';
import '../style/index.css';
import '../style/forms.css';
import '../style/createPage.css';

function ShareKeySplashScreen(props) {

    return (

        <div>
            <div className={'createSectionWrapper'}>

                <Row>
                    <Col xs={{span:12}} md={{span:12, offset:0}} lg={{span:12, offset:0}}>
                        <div>
                            <div style={{fontSize: 40}}>
                                <h3>
                                    Ready to begin the key sharing ceremony.
                                </h3>
                                <div style={{marginTop:20}}>
                                   <ul className={'ulKeyCeremony'}>
                                       <li>
                                           Handle keys with care. Ensure nobody around you is recording.
                                       </li>
                                       <li>
                                           Confirm this computer and its peripherals are offline with wifi and bluetooth disabled.
                                       </li>
                                       <li>
                                           Ensure you permanently delete all keys from this computer when you are done distributing them
                                       </li>

                                       <li>
                                           Print your keys using an offline printer, and wipe its memory after usage.
                                       </li>
                                       <li>
                                           Distribute keys physically by handing them directly to your key guardians
                                       </li>
                                       <li>
                                           Educate your key guardians on how and where to store the keys, and who they should or shouldn't disclose them to in case of emergency.
                                           Consider your key guardian's succession plans and how your key would be stored over a long term.
                                       </li>
                                       <li>
                                           Consider performing an annual check-in with your key guardians.
                                       </li>
                                       <li>
                                           Consider the composition of people which you select as key guardians and assess their risk of collusion or extortion through unwillingness to cooperate
                                       </li>
                                       <li>
                                           Consider your succession plan, and how your successors would locate your key guardians in case of an emergency.
                                           If you keep a list of key guardians as reference, consider its security and accessibility.
                                       </li>
                                       <li>
                                           Never share keys over email or chat. However if you do, delete the key from your sent items, chat history, photos, etc, and use
                                           different channels and devices (e.g Securezip, zoom call, etc) for each key.
                                       </li>

                                   </ul>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col xs={{span:12}} md={{span:12, offset:0}} lg={{span:12, offset:0}}>
                        <div className={'bottomWizardWrapper'}>
                            <Button
                                variant = {'primary'}
                                size    = {'lg'}
                                onClick = {()=>props.continue()}
                            >
                                Continue
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )

}

export default ShareKeySplashScreen;
