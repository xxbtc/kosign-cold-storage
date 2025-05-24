import React, { Component, useState, useEffect, useRef } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../style/index.css';
import '../style/homepage.css';

import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';

import {BsTwitter} from 'react-icons/bs';
import {BsEnvelope} from 'react-icons/bs';


function HomepageFAQ(props) {
    const navigate                   = useNavigate();


    return (
        <div className={'homepageReasonsRow'} style={{paddingTop:40}}>
            <Container>
                <Row style={{marginTop:30, textAlign:'left'}}>
                    <Col xs={{span:12}} md={{span:6, offset:0}} lg={{span:6, offset:0}} >
                        <h3>About Kosign</h3>
                        <div style={{paddingRight:60, marginTop:40}}>
                            Kosign provides the foundational security layer that makes all your other security tools actually secure. 
                            Our passwordless, offline cold storage vaults are secured by distributed physical keys instead of master passwords.
                            <br/><br/>
                            Store crypto seeds, master passwords, 2FA recovery codes, and critical data without the circular 
                            dependencies that plague modern security. Perfect for digital inheritance planning, emergency access, and long term storage.
                            <div style={{marginTop:20}}>
                                <a className={'linkage'} href={'https://twitter.com/kosign_xyz'} target={'_blank'}>
                                    <BsTwitter /> &nbsp;@kosign_xyz
                                </a>
                            </div>
                            <div style={{marginTop:20}}>
                                <a className={'linkage'} href={'mailto:support@kosign.xyz'} target={'_blank'}>
                                    <BsEnvelope/> &nbsp;support@kosign.xyz
                                </a>
                            </div>
                        </div>
                    </Col>
                    <Col xs={{span:12}} md={{span:6, offset:0}} lg={{span:6, offset:0}}>
                        <h3>Frequently Asked Questions</h3>
                        <Accordion style={{marginTop:20, marginBottom:50}}>
                            <Accordion.Item eventKey="0" className={'accordionItem'}>
                                <Accordion.Header>Why do I need a Kosign Vault?</Accordion.Header>
                                <Accordion.Body>
                                    <p>Because your current security setup has <strong>impossible questions</strong> with no good answers:</p>
                                    <ul style={{margin:'1rem 0', paddingLeft:'1.5rem'}}>
                                        <li><strong>"Where do I write my password manager's master password?"</strong> Cleartext on paper is fragile, another password manager creates infinite loops.</li>
                                        <li><strong>"Where do I store my 2FA backup codes?"</strong> In my password manager? But I need 2FA to get INTO my password manager.</li>
                                        <li><strong>"What if I get hit by a bus tomorrow?"</strong> Family needs access but giving them passwords now makes everything insecure.</li>
                                    </ul>
                                    <p>Kosign solves these <a className={'linkage'} href={"https://kosignxyz.medium.com/breaking-cyclic-dependencies-in-password-management-introducing-kosign-xyz-ac04f92eb9ef"} target={"_blank"}>circular dependencies</a> by replacing master passwords with distributed keys and social recovery.</p>
                                </Accordion.Body>
                            </Accordion.Item>
                            
                            <Accordion.Item eventKey="1" className={'accordionItem'}>
                                <Accordion.Header>I have a hardware wallet, why do I need Kosign?</Accordion.Header>
                                <Accordion.Body>
                                    <p>Hardware wallets are excellent for <strong>daily security</strong>, but they have a massive blind spot: <strong>seed phrase backup</strong>.</p>
                                    <p>Your expensive hardware wallet is worthless if:</p>
                                    <ul style={{margin:'1rem 0', paddingLeft:'1.5rem'}}>
                                        <li>Someone finds your seed phrase written on paper → <strong>all funds stolen</strong></li>
                                        <li>You lose your seed phrase in a fire/flood → <strong>all funds gone forever</strong></li>
                                        <li>You make multiple backup copies → <strong>every copy multiplies your theft risk</strong></li>
                                    </ul>
                                    <p>Kosign encrypts your seed phrase in distributed vaults, so you can safely make multiple copies for backup and inheritance without security risk.</p>
                                </Accordion.Body>
                            </Accordion.Item>
                            
                            <Accordion.Item eventKey="2" className={'accordionItem'}>
                                <Accordion.Header>I use a password manager, why do I need Kosign?</Accordion.Header>
                                <Accordion.Body>
                                    <p>Password managers are amazing... until you need to back up the <strong>master password itself</strong>.</p>
                                    <p>The circular dependency problem:</p>
                                    <ul style={{margin:'1rem 0', paddingLeft:'1.5rem'}}>
                                        <li>Can't store master password in the password manager (obviously)</li>
                                        <li>Can't write it on paper safely (defeats the purpose of having a password manager)</li>
                                        <li>Can't use another password manager (where do you store THAT master password?)</li>
                                        <li>Family inheritance becomes impossible without compromising current security</li>
                                    </ul>
                                    <p>Kosign provides the <strong>foundational layer</strong> to store master passwords, 2FA backup codes, and recovery keys without circular dependencies.</p>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="3" className={'accordionItem'}>
                                <Accordion.Header>What is social recovery?</Accordion.Header>
                                <Accordion.Body>
                                    <p>Social recovery lets you distribute vault keys to trusted people while keeping your data secure until multiple people cooperate.</p>
                                    <p><strong>Example:</strong> Give keys to 5 people, require any 3 to unlock. Now:</p>
                                    <ul style={{margin:'1rem 0', paddingLeft:'1.5rem'}}>
                                        <li>✓ No single person can access your vault alone</li>
                                        <li>✓ You can lose 2 keys and still recover</li>
                                        <li>✓ Family can inherit without compromising current security</li>
                                        <li>✓ Emergency access when you're unavailable</li>
                                    </ul>
                                    <p>It's like requiring multiple signatures on a bank account, but for your digital life.</p>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="4" className={'accordionItem'}>
                                <Accordion.Header>Why not just split my seed phrase into multiple parts?</Accordion.Header>
                                <Accordion.Body>
                                    <p>Splitting seed phrases seems logical but creates <strong>more problems than it solves</strong>:</p>
                                    <ul style={{margin:'1rem 0', paddingLeft:'1.5rem'}}>
                                        <li><strong>Multiple single points of failure:</strong> Split in half? Now you have 2 ways to lose everything instead of 1</li>
                                        <li><strong>All-or-nothing recovery:</strong> Lose any one piece and your funds are gone forever</li>
                                        <li><strong>Security through obscurity:</strong> If someone finds one part, they know you have crypto and will search for the rest</li>
                                        <li><strong>Distribution nightmare:</strong> Where do you safely store each unencrypted piece?</li>
                                    </ul>
                                    <p>Kosign uses <strong>threshold cryptography</strong> instead: your seed is encrypted in a vault and distributed as separate keys where you need both the vault AND enough keys to decrypt it (e.g., vault + 3 of 5 keys). This provides redundancy AND security - lose a few keys and you can still recover. Plus, you can safely make multiple copies of both vault and keys since everything is encrypted.</p>
                                </Accordion.Body>
                            </Accordion.Item>
                            
                            <Accordion.Item eventKey="5" className={'accordionItem'}>
                                <Accordion.Header>Which encryption algorithm do vaults use?</Accordion.Header>
                                <Accordion.Body>
                                    <p>Kosign vaults use <strong>AES-256 encryption</strong> - the same standard used by banks and governments worldwide. Your data is encrypted offline in your browser.</p>
                                </Accordion.Body>
                            </Accordion.Item>
                            
                            <Accordion.Item eventKey="6" className={'accordionItem'}>
                                <Accordion.Header>Can I unlock my vault if the website is down?</Accordion.Header>
                                <Accordion.Body>
                                    <p>Yes! Kosign's unlock tool is <strong>completely open source</strong> and runs directly on your computer. It is designed to be future-proof (to the extent possible) and to last generations. Even if the website becomes unavailable one day, you can always access your vaults.</p>
                                    <p>Open source unlock utility: <a className={'linkage'} href={'https://github.com/xxbtc/kosign-unlock'} target={'_blank'}>github.com/xxbtc/kosign-unlock</a></p>
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
