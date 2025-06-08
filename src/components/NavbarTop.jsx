import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from 'reactstrap';
import { MdMenu } from "react-icons/md";
import logoIMG from "../images/paperlock_small.jpg";
import '../style/navbar.css';

const NavbarTop = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const location = useLocation();

    return (
        <div className={'navbarWrapper'}>
            <Container fluid>
                <Navbar expand="md" className={'navbarCustom modern-navbar'}>
                    <NavbarBrand href="/" className={'nav-brand'}>
                        <div className='navbarLogo'>
                            <img src={logoIMG} alt="Kosign logo" />
                            Kosign.xyz
                        </div>
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle} className={'navbar-toggler'} >
                        <MdMenu fill={'#fff'}/>
                    </NavbarToggler>
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="justify-content-end modern-nav" navbar style={{width:'100%'}}>
                            <NavItem className={'nav-item'}>
                                <Link className={"nav-link" + (location.pathname === '/' ? ' active' : '')} to={'/'}>Home</Link>
                            </NavItem>
                            <NavItem className={'nav-item'}>
                                <Link className={"nav-link" + (location.pathname === '/unlock' ? ' active' : '')} to={'/unlock'}>Unlock</Link>
                            </NavItem>
                            <NavItem className={'nav-item'}>
                                <Link className={"nav-link" + (location.pathname === '/pricing' ? ' active' : '')} to={'/pricing'}>Pricing</Link>
                            </NavItem>
                            <NavItem className={'nav-item'}>
                                <Link className={
                                    "nav-link" +
                                    (location.pathname === '/create' ? ' active' : ' nav-link-cta')
                                } to={'/create'}>Create Vault</Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </Container>
        </div>
    )
};

export default NavbarTop;
