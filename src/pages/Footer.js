import React from 'react'
import {FaFacebookF} from 'react-icons/fa'
import {FaTwitter} from 'react-icons/fa'
import {FaLinkedin} from 'react-icons/fa'
import {  useNavigate } from 'react-router-dom'

const Footer = () => {

    const Navigate =useNavigate();

    const HomeNavigate = () =>{
        Navigate('/')
    }
    return (
            <footer>
                {/* <!-- footer-top-area-start --> */}
                <div className="footer-top-area ptb-80">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-40-2  mb-40-3">
                                {/* <!-- single-footer-start --> */}
                                <div className="single-footer mb-3">
                                    {/* <!-- footer-logo-start --> */}
                                    <div className="footer-logo">
                                        {/* <a href="#"><img src="/img/logo/3.png" alt="logo" /></a> */}
                                        <a onClick={HomeNavigate}><img src="/img/logo/Pyurely-01.png" alt="logo" /></a>

                                        
                                    </div>
                                    {/* <!-- footer-logo-end -->
                                <!-- footer-content-start --> */}
                                    <div className="footer-content">
                                        <p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
                                            consequat, vel illum dolore eu feugiat nulla facilisis.</p>
                                        <div className="footer-social">
                                            <h3>Follow Us On Social:</h3>
                                            <ul>
                                                <li><a href="#">
                                                    {/* <i className="fa fa-facebook"></i> */}
                                                    <FaFacebookF />
                                                    </a></li>
                                                <li><a href="#">
                                                    {/* <i className="fa fa-twitter"></i> */}
                                                    <FaTwitter />
                                                    </a></li>
                                                <li><a href="#">
                                                    {/* <i className="fa fa-rss"></i> */}
                                                    <FaLinkedin />
                                                    </a></li>
                                                {/* <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li> */}
                                            </ul>
                                        </div>
                                    </div>
                                    {/* <!-- footer-content-end --> */}
                                </div>
                                {/* <!-- single-footer-end --> */}
                            </div>
                            <div className="col-xl-2 col-lg-6 col-md-6 col-sm-6 col-12 mb-40-2  mb-40-3">
                                {/* <!-- single-footer-start --> */}
                                <div className="single-footer mb-3">
                                    {/* <!-- footer-title-start --> */}
                                    <div className="footer-title">
                                        <h5>Opening Time</h5>
                                    </div>
                                    {/* <!-- footer-title-end -->
                                <!-- footer-content-start --> */}
                                    <div className="footer-content-2">
                                        <ul>
                                            <li>Mon - Fri: 8AM - 10PM</li>
                                            <li>Sat: 9AM-8PM</li>
                                            <li>Sun: Closed</li>
                                        </ul>
                                        <h4>We Work All The Holidays</h4>
                                    </div>
                                    {/* <!-- footer-content-end --> */}
                                </div>
                                {/* <!-- single-footer-end --> */}
                            </div>
                            <div className="col-xl-2 col-lg-6 col-md-6 col-sm-6 col-12">
                                {/* <!-- single-footer-start --> */}
                                <div className="single-footer mb-3">
                                    {/* <!-- footer-title-start --> */}
                                    <div className="footer-title">
                                        <h5>Information</h5>
                                    </div>
                                    {/* <!-- footer-title-end -->
                                <!-- footer-top-menu-start --> */}
                                    <div className="footer-top-menu">
                                        <ul>
                                            <li><a href="#">About Us</a></li>
                                            <li><a href="#">Delivery Information</a></li>
                                            <li><a href="#">Privacy Policy</a></li>
                                            <li><a href="#">Terms & Conditions</a></li>
                                            <li><a href="#">Information link</a></li>
                                        </ul>
                                    </div>
                                    {/* <!-- footer-top-menu-end --> */}
                                </div>
                                {/* <!-- single-footer-end --> */}
                            </div>
                            <div className="col-xl-2 col-lg-6 col-md-6 col-sm-6 col-12">
                                {/* <!-- single-footer-start --> */}
                                <div className="single-footer">
                                    {/* <!-- footer-title-start --> */}
                                    <div className="footer-title">
                                        <h5>Customer Service</h5>
                                    </div>
                                    {/* <!-- footer-title-end -->
                                <!-- footer-top-menu-start --> */}
                                    <div className="footer-top-menu">
                                        <ul>
                                            <li><a href="#">Contact Us</a></li>
                                            <li><a href="#">Returns</a></li>
                                            <li><a href="#">Site Map</a></li>
                                            <li><a href="#">Specials</a></li>
                                            <li><a href="#">Brands</a></li>
                                        </ul>
                                    </div>
                                    {/* <!-- footer-top-menu-end --> */}
                                </div>
                                {/* <!-- single-footer-end --> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- footer-top-area-end --> */}
                <div className="footer-area bg  ptb-40">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                {/* <!-- copy-right-area-start --> */}
                                <div className="copy-right-area mb-3">
                                    <p>&copy; 2022 <strong>Pyurely </strong> design <i className="fa fa-heart text-danger"></i> by <a href="#" target="_blank"><strong>Hnh Tech
                                        Solutions</strong></a></p>
                                </div>
                                {/* <!-- copy-right-area-end --> */}
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                {/* <!-- footer-bottom-menu-start --> */}
                                <div className="footer-bottom-menu">
                                    <ul>
                                        <li><a href="#">Policy</a></li>
                                        <li><a href="#">Term & Conditions</a></li>
                                        <li><a href="#">Affiliate</a></li>
                                        <li><a href="#">Help</a></li>
                                    </ul>
                                </div>
                                {/* <!-- footer-bottom-menu-end --> */}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
    )
}

export default Footer

