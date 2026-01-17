import React from 'react'
import { Link } from 'react-router-dom'
import "../style/footer.css";
import {FaXTwitter, FaMedium} from 'react-icons/fa6';

export default function Footer() {
    return (
        <footer className="footerContainer">
            <div className="footerContent">
                <div className="footerCopyright">
                    &copy; {new Date().getFullYear()} Kosign. All rights reserved.
                </div>
                <ul className="footerlist">
                    <li>
                        <Link to={'/legal'}>Terms of Service</Link>
                    </li>
                    <li>
                        <Link to={'/privacy'}>Privacy Policy</Link>
                    </li>
                    <li>
                        <a href="https://twitter.com/kosign_xyz" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)">
                            <FaXTwitter />
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}
