import React, { Component, useState, useEffect, useRef } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../style/index.css';
import '../style/homepage.css';

import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';

import {FaXTwitter} from 'react-icons/fa6';
import {BsEnvelope} from 'react-icons/bs';
import logoIMG from "../images/kosign-trefoil.png";


function HomepageFAQ(props) {
    const navigate                   = useNavigate();


    return (
        <div className={'homepageReasonsRow'}>
            <Container>
                <Row style={{marginTop:30, textAlign:'left'}}>
                    <Col xs={{span:12}} md={{span:6, offset:0}} lg={{span:6, offset:0}} >
                        <div style={{display: 'flex', alignItems: 'center', marginBottom: 20}}>
                            <img src={logoIMG} alt="Kosign Logo" style={{height: 40, marginRight: 15}} />
                            <h3 style={{margin: 0}}>About Kosign</h3>
                        </div>
                        <div style={{paddingRight:60, marginTop:40}}>
                            <strong>Kosign</strong> is an open-source tool for creating distributed paper vaults secured by threshold encryption. 
                            Split your secrets across multiple keys, distribute to trusted people or locations, and recover with any subset (e.g., 3-of-5). 
                            Perfect for cold storage of crypto seeds, master passwords, 2FA codes, and secure inheritance. 
                            <strong> 100% open source, runs offline, works forever.</strong>
                            
                            <div style={{marginTop:20}}>
                                <FaXTwitter />&nbsp;
                                <a className={'linkage'} href={'https://twitter.com/kosign_xyz'} target={'_blank'}>
                                     @kosign_xyz
                                </a>
                            </div>
                            <div style={{marginTop:20}}>
                                <BsEnvelope/>&nbsp;
                                <a className={'linkage'} href={'mailto:support@kosign.xyz'} target={'_blank'}>
                                    support@kosign.xyz
                                </a>
                            </div>
                        </div>
                    </Col>
                    <Col xs={{span:12}} md={{span:6, offset:0}} lg={{span:6, offset:0}}>
                        <h3 className="faq-title-mobile-spacing">Frequently Asked Questions</h3>
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
                                    <p>Hardware wallets are excellent for <strong>transaction signing</strong>, but they have a massive blind spot: <strong>seed phrase backup</strong>.</p>
                                    <p>Your hardware wallet is only as secure as your seed phrase backup:</p>
                                    <ul style={{margin:'1rem 0', paddingLeft:'1.5rem'}}>
                                        <li><strong>Paper backup risks:</strong> Someone finds your seed phrase → all funds stolen</li>
                                        <li><strong>Single point of failure:</strong> Fire/flood destroys your backup → funds gone forever</li>
                                        <li><strong>Multiple copies problem:</strong> Each copy multiplies your theft risk</li>
                                    </ul>
                                    <p>Kosign encrypts your seed phrase in distributed vaults, so you can safely make multiple copies for backup and inheritance, greatly reducing your security risks.</p>
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

                            <Accordion.Item eventKey="8" className={'accordionItem'}>
                                <Accordion.Header>What if my vault gets destroyed in a fire/flood?</Accordion.Header>
                                <Accordion.Body>
                                    <p>This is exactly why Kosign is designed to let you safely make multiple backup copies of your vault!</p>
                                    <ul style={{margin:'1rem 0', paddingLeft:'1.5rem'}}>
                                        <li><strong>Multiple copies are safe:</strong> Unlike regular paper backups (like seed phrases), Kosign vaults are encrypted so you can safely store copies in different locations</li>
                                        <li><strong>Flexible storage:</strong> Store copies in safety deposit boxes, with trusted family/friends, or in secure locations</li>
                                        <li><strong>Digital backup option:</strong> You can also store vault copies on USB drives or other digital media</li>
                                    </ul>
                                    <p>The distributed nature of Kosign means no single disaster can lock you out of your assets.</p>
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
                                    <p><strong>Absolutely!</strong> This is one of the key benefits of Kosign being fully open source.</p>
                                    <p>You can unlock your vaults in multiple ways:</p>
                                    <ul style={{margin:'1rem 0', paddingLeft:'1.5rem'}}>
                                        <li><strong>Download and run locally:</strong> Clone the entire Kosign app from <a className={'linkage'} href={'https://github.com/xxbtc/kosign'} target={'_blank'} rel="noreferrer">GitHub</a> and run it offline</li>
                                        <li><strong>Future-proof design:</strong> Built to work for generations, even if the website no longer exists</li>
                                    </ul>
                                    <p>Your vaults are designed to outlast any single website or company - that's the power of open source.</p>
                                </Accordion.Body>
                            </Accordion.Item>
                            
                            <Accordion.Item eventKey="7" className={'accordionItem'}>
                                <Accordion.Header>Has Kosign been audited?</Accordion.Header>
                                <Accordion.Body>
                                    <p>Kosign is <strong>100% open source:</strong> The entire codebase is available at <a className={'linkage'} href={'https://github.com/xxbtc/kosign'} target={'_blank'} rel="noreferrer">github.com/xxbtc/kosign</a>. Anyone can inspect, verify, and audit the cryptographic implementation - no black boxes or proprietary code.</p>   
                                    <p><strong>Battle-tested cryptography:</strong> Kosign uses proven, industry-standard algorithms:</p>
                                    
                                    <ul style={{margin:'1rem 0', paddingLeft:'1.5rem'}}>
                                        <li><strong>AES-256 encryption</strong> - The same standard used by banks and governments</li>
                                        <li><strong>PBKDF2 key derivation</strong> - 100,000+ iterations with SHA-256</li>
                                        <li><strong>Shamir's Secret Sharing</strong> - Mathematically proven threshold cryptography</li>
                                        <li><strong>Client-side only</strong> - All encryption happens in your browser, never on servers</li>
                                    </ul>
                            
                                    <p>We encourage security researchers to review the code and welcome responsible disclosure of any issues.</p>        
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
