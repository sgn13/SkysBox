import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";

import '../../css/board.css'
class Board extends Component {

    state = {
        click: 'false'
    }
    render() {

        return (<div className='main-board'>
            <h3 >Select your theme</h3>
            <div className="board" >
                <NavLink to="/design" className="scroll-link">
                    <div className='business-board'>
                        <p>Business-card</p>

                    </div>
                </NavLink>
                <NavLink to="/design" className="scroll-link">
                    <div className='banner-board' >
                        <p>Banner-design</p>

                    </div>
                </NavLink>

            </div>
        </div >);
    }
}

export default Board;