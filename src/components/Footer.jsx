import React, {  } from 'react'
import { Link } from 'react-router-dom'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import "../style/footer.css";
import {FaTwitter, FaMedium} from 'react-icons/fa';

export default function Footer() {
    return (
        <div className="footerContainer">
            <Container>
                <footer className="footer">

                    <Row>
                        <Col>

                            <ul className="footerlist">
                                <li>
                                    <a href={'https://github.com/xxbtc/kosign-coldstorage'}>https://github.com/xxbtc/kosign-coldstorage</a>
                                </li>
                            </ul>
                        </Col>
                    </Row>

                </footer>
            </Container>
        </div>
    )
}
