import React, { Component } from 'react';
import '../css/home.css';
import { NavLink } from "react-router-dom";

class Home extends Component {
    state = {}
    render() {
        return (
            <div>
                <div className="banner">
                    <div className="container">
                        <h1>Card Box</h1>
                        <p>
                            Easily customize greeting cards for every event. Print or send as eCard for free!
                        </p>
                        <NavLink to="/design" className="scroll-link btn1 btn1-white">Design your card</NavLink>
                    </div>
                </div>
                <div className="card">
                    <div className="business">
                        <NavLink to="/design" className="scroll-link">
                            <img src={require("../image/business-card.jpg")} alt="" />
                        </NavLink>
                        <h4>business-card</h4>
                    </div>
                    <div className="bannner">
                        <NavLink to="/design" className="scroll-link">
                            <img src={require("../image/banner.jpg")} alt="" />
                        </NavLink >
                        <h4>Banner-design</h4>
                    </div>
                    <div className="filter">
                        <NavLink to="/filter" className="scroll-link">
                            <img src={require("../image/filter.jpg")} alt="" />
                        </NavLink>
                        <h4>Filter pictures</h4>
                    </div>
                </div>


            </div>);
    }
}

export default Home;