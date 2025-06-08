import React from 'react'
import { Link } from 'react-router-dom'
import "../style/footer.css";
import {FaXTwitter, FaMedium} from 'react-icons/fa6';

export default function Footer() {
    return (
        <footer className="footerContainer">
            <nav className="footerNav">
                <ul className="footerlist">
                    <li>
                        <Link to={'/unlock'}>Unlock</Link>
                    </li>
                    <li>
                        <Link to={'/pricing'}>Pricing</Link>
                    </li>
                    <li>
                        <Link to={'/legal'}>Terms of Service</Link>
                    </li>
                    <li>
                        <Link to={'/privacy'}>Privacy Policy</Link>
                    </li>
                    <li>
                        <a href={'https://kosignxyz.medium.com'} target={'_blank'} rel="noopener noreferrer">Blog</a>
                    </li>
                </ul>
                <div className="footerSocial">
                    <a href="https://twitter.com/kosignxyz" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)"><FaXTwitter /></a>
                    <a href="https://kosignxyz.medium.com" target="_blank" rel="noopener noreferrer" aria-label="Medium"><FaMedium /></a>
                </div>
            </nav>
            <div className="footerCopyright">
                &copy; {new Date().getFullYear()} Kosign. All rights reserved.
            </div>
        </footer>
    )
}
