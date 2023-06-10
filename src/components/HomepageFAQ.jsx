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
                                    Kosign vaults are designed to store critical data, such as passwords,
                                    account recovery codes, private keys, and other critical data.
                                    You need a Kosign vault to securely store your data offline and
                                    to be recoverable in emergencies.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1" className={'accordionItem'}>
                                <Accordion.Header>What kind of data should I store?</Accordion.Header>
                                <Accordion.Body>
                                    You can store any type of text data, up to 5,000 characters per vault.
                                    <ul>
                                        <li>Passwords</li>
                                        <li style={{marginTop:6}}>Multi-factor authentication tokens</li>
                                        <li>Account recovery codes</li>
                                        <li>Digital asset keys</li>
                                        <li>... and any other critical data</li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2" className={'accordionItem'}>
                                <Accordion.Header>Can my key guardians open my vault without me?</Accordion.Header>
                                <Accordion.Body>
                                    No. Your key guardians never have access to the vault contents.
                                    The vault contents can only be decrypted by gathering
                                    the required amount of keys e.g. 5-out-of-20 keys.
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
                                    Yes! The unlock tool can run locally on your computer.
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
