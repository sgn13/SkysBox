import React, { Component, Fragment } from 'react';
import Sidebar from '../sidebar';
import { Link, NavLink } from "react-router-dom";
import { Button, NavItem } from 'react-bootstrap';
import RegisterModal from '../auth/RegistrationModal';
import Logout from '../auth/Logout'
import LoginModal from '../auth/LoginModel'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';



class nav extends Component {
    state = {
        isOpen: false
    };

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState(
            {
                isOpen: !this.stateisOpen
            }
        );
    };
    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                {/* <NavItem >
                    <span className="navbar-text mr-3">
                        <div class="strong">{user ? `Welcome, ${user.name}` : ''}</div>
                    </span>
                </NavItem> */}
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <Button variant="outline-secondary" className="mr-sm-4">
                    <NavItem>
                        <RegisterModal />
                    </NavItem></Button>
                <Button variant="outline-secondary" className="mr-sm-4">
                    <NavItem>
                        <LoginModal />
                    </NavItem></Button>
            </Fragment>
        );

        return (

            <div>
                <header id="home">
                    {/* <!-- navbar --> */}
                    <nav id="nav">
                        <div className="nav-center">
                            {/* <!-- nav header --> */}
                            <div className="nav-header">
                                <h3 className="cardlogo">Card<span>Box</span></h3>
                                <button className="nav-toggle">
                                    <i className="fas fa-bars"></i>
                                </button>
                            </div>
                            {/* <!-- links --> */}
                            <div className="links-container">
                                <ul className="links">
                                    <li>
                                        <NavLink to="/" className="scroll-link">home</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/design" className="scroll-link">Design templates</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/gallery" className="scroll-link">Gallery</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/help" className="scroll-link">Help</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/uploadImg" className="scroll-link">Upload</NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div className="social">
                                {isAuthenticated ? authLinks : guestLinks}

                            </div>
                        </div>

                    </nav>

                </header>

                {/* <Sidebar /> */}

                {/* <!-- cava board  -->
    <!-- ----------------------- -->
    <!-- ------------------------------ --> */}

            </div>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(nav);