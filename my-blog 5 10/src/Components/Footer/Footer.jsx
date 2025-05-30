import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

const Footer = () => {

    const location = useLocation();

    const isHomePage = location.pathname === '/';

    const footerClasses = classNames(
        'minimal-footer',
        {
            'footer-large-gap': isHomePage,
            'footer-small-gap': !isHomePage
        }
    );

    return (
        <div className={footerClasses}>
            <footer className="footer-container">
                <div className="footer-section contact-us">
                    <h6 className="footer-heading">Contact Us</h6>
                    <p>
                        <strong>Email: </strong>BlogSphere@gmail.com<br />
                        <strong>Phone No: </strong>96823678685
                    </p>
                </div>

                <div className="footer-section follow-us">
                    <h6 className="footer-heading">Follow Us</h6>
                    <div className="social-icons">
                        <a className="social-icon" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} size="2x" />
                        </a>
                        <a className="social-icon" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} size="2x" />
                        </a>
                        <a className="social-icon" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} size="2x" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
