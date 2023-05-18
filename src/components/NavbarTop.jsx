import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem} from 'reactstrap';

import {Container }from 'react-bootstrap';

import { MdMenu } from "react-icons/md";
import {SiMeteor} from 'react-icons/si';

import '../style/navbar.css';
import logoIMG from "../images/iceqr.jpg";

const NavbarTop = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className={'navbarWrapper'}>
            <Container>
                <Navbar expand="md" className={'navbarCustom'} >
                    <NavbarBrand href="/" className={'nav-brand'}>
                        <div className='navbarLogo'>
                            {/*<SiMeteor className={'navbarLogoIcon'} />*/}
                            <img src={logoIMG} />
                            Kosign
                        </div>
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle} className={'navbar-toggler'} >
                        <MdMenu fill={'#000'}/>
                    </NavbarToggler>
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="justify-content-end" navbar style={{width:'100%'}}>
                            <NavItem className={'nav-item'}>
                                <Link className={"nav-link"} to={'/pricing'}>Pricing</Link>
                            </NavItem>
                            <NavItem className={'nav-item'}>
                                <Link className={"nav-link"} to={'/unlock'}>Unlock</Link>
                            </NavItem>
                            <NavItem className={'nav-item'}>
                                <Link className={"nav-link"} to={'/create'}>Create</Link>
                            </NavItem>

                           {/* <NavItem className={'nav-item'}>
                                <Link className={"nav-link"} to={'/'}>Home</Link>
                            </NavItem>
                            <NavItem className={'nav-item'}>
                                <Link className={"nav-link"} to={'/create'}>Create</Link>
                            </NavItem>
                            <NavItem className={'nav-item'}>
                                <Link className={"nav-link"} to={'/recover'}>Recover</Link>
                            </NavItem>*/}
                        </Nav>
                    </Collapse>
                </Navbar>

            </Container>
        </div>
    )


};

export default NavbarTop;
