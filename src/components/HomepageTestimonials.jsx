import React, { Component, useState, useEffect, useRef } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../style/index.css';
import '../style/homepage.css';

import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import {Carousel} from "react-bootstrap";
import ShareAccepted from "./ShareKeyshare";
import TweetEmbed from "react-tweet-embed";
import layerWaves from "../images/layer-waves.svg";
import Marquee from "react-fast-marquee";

import img1243732864404983808 from '../images/1243732864404983808.jpg';
import img1514376453768441858 from '../images/1514376453768441858.jpg';
import img1446533482998484992 from '../images/1446533482998484992.jpg';
import img1366031922120585217 from '../images/1366031922120585217.jpg';
import img1557826172267937792 from '../images/1557826172267937792.jpg';
import img1552492518209687552 from '../images/1552492518209687552.jpg';
import tweet2fa from '../images/tweet2fa.png';

function HomepageTestimonials(props) {
    const navigate                   = useNavigate();


    return (
        <div>
            <div style={{position:'relative', display:'block'}}>

                <Marquee
                    pauseOnHover={true}
                    speed={30}
                    gradient={false}
                    className={'marqueeContainer'}
                >
                    {/*<div className="scrollBox">
                        <img src={img1514376453768441858} />
                    </div>*/}
                    {/*<div className="scrollBox">
                        <img src={img1243732864404983808} />
                    </div>*/}
                   {/* <div className="scrollBox">
                        <img src={img1446533482998484992} />
                    </div>*/}
                    <div className="scrollBox">
                        <img src={img1366031922120585217} />
                    </div>
                    <div className="scrollBox">
                        <img src={img1557826172267937792} />
                    </div>
                    <div className={"scrollBox"}>
                        <img src={img1552492518209687552} />
                    </div>
                </Marquee>

            </div>
        </div>

    )

}

export default HomepageTestimonials;
