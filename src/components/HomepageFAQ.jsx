import React, { Component, useState, useEffect, useRef } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../style/index.css';
import '../style/homepage.css';

import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';


function HomepageFAQ(props) {
    const navigate                   = useNavigate();


    return (
        <div className={'homepageReasonsRow'} style={{paddingTop:40}}>
            <Container>
                <Row style={{marginTop:30}}>
                    <Col xs={{span:12}} md={{span:6, offset:0}} lg={{span:6, offset:0}} style={{marginBottom:50}}>
                        <h3>About Kosign</h3>
                        <div style={{paddingRight:60, marginTop:40}}>
                            Kosign is an offline cold storage paper vault using quorum-based security to
                            protect and recover sensitive critical data.

                            Securely store your data encrypted in a paper vault.

                            Distribute vault keys with up to 20 people, and set how many
                            keys are needed to unlock.

                            The quorum based security model is perfect for data
                            that needs to be stored securely and recovered in emergencies, such as passwords,
                            and digital asset keys.
                        </div>
                    </Col>
                    <Col xs={{span:12}} md={{span:6, offset:0}} lg={{span:6, offset:0}}>
                        <h3>Frequently Asked Questions</h3>
                        <Accordion style={{marginTop:20, marginBottom:50}}>
                            <Accordion.Item eventKey="0" className={'accordionItem'}>
                                <Accordion.Header>Why do I need a Kosign Vault?</Accordion.Header>
                                <Accordion.Body>
                                    Kosign vaults are designed for long term storage of passwords,
                                    account recovery codes, private keys, and other critical data.
                                    You need a Kosign vault to solve &nbsp;
                                    <a className={'linkage'} href={"https://kosignxyz.medium.com/breaking-cyclic-dependencies-in-password-management-introducing-kosign-xyz-ac04f92eb9ef"}
                                       target={"_blank"}>
                                         cyclic dependencies in password management
                                    </a>&nbsp;
                                    and to ensure a secure succession/inheritance plan for your data.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1" className={'accordionItem'}>
                                <Accordion.Header>What is social recovery?</Accordion.Header>
                                <Accordion.Body>
                                    <p>Social recovery gives you peace of mind, ensuring you can always access
                                    your vault even if you lost your key.
                                    Distribute up to 20 keys with trusted individuals,
                                    and set how many are needed to unlock (e.g. 5-out-of-20).
                                    </p>
                                    <p>Social recovery is also your data inheritance plan. This enables your successors to
                                         store your critical data over a long period of time in a very secure way.
                                        Successors can then call upon key guardians in an emergency.
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2" className={'accordionItem'}>
                                <Accordion.Header>Can my key guardians open my vault without me?</Accordion.Header>
                                <Accordion.Body>
                                    <p>
                                        No. Key guardians only hold a key -- they do not hold a copy of the encrypted vault contents.
                                        The vault contents can only be decrypted by having a copy of the vault and gathering
                                        the required amount of keys.
                                    </p>
                                    <p>
                                        If you would like to give someone the ability to decrypt the vault without you,
                                        you must give them a copy of the encrypted vault
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3" className={'accordionItem'}>
                                <Accordion.Header>Which encryption algorythm do vaults use?</Accordion.Header>
                                <Accordion.Body>
                                    Kosign vaults are secured by AES 256 bits
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="4" className={'accordionItem'}>
                                <Accordion.Header>Can I unlock my vault if the website is down?</Accordion.Header>
                                <Accordion.Body>
                                    Yes! The unlock tool is open source and can run locally on your computer.
                                    Get the <a href={'https://github.com/xxbtc/kosign-unlock'} target={'_blank'}>source code on Github</a>
                                </Accordion.Body>
                            </Accordion.Item>




                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </div>

    )

}

export default HomepageFAQ;
