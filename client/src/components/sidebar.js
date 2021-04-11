import React, { Component } from 'react';
import { Link } from "react-router-dom";
import CanvaNew from './canva/canvaNew'
import Text from './sidebar/text'
import { Button, NavItem } from 'react-bootstrap';
import cardB1 from '../image/businessCard/cardB_1.jpg'
import Shape from './sidebar/shape'
import { SketchPicker } from 'react-color';
// import { storage } from '../components/firebase/firebaseConfig'
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginModal from '../components/auth/LoginModel'


// import { Wrapper } from 'react-download-svg'

class Sidebar extends Component {

    state = {

        list: ['sagun', 'shrestha', 'thimi', '9852213'],
        color: '',
        backgroundImage: '',
        font: '',
        fontsize: '',
        selectedColor: '',
        bold: '',
        italic: '',
        underline: '',
        company: 'Text1',
        phone: 'Text2',
        address: 'Text3',
        email: 'Text4',
        text1: '',
        text2: '',
        text3: '',
        url: '',
        text4: '',
        text5: '',
        text6: '',
        text7: '',
        styles: {},
        addid: 0,
        imageSize: 30,
        items: []

    }
    static propTypes = {
        isAuthenticated: PropTypes.bool,


    };
    handleFont = (e) => {
        this.setState({
            imageSize: e.target.value

        })
        console.log(this.state.imageSize)

    }
    handleChange = (e) => {
        this.setState({
            item: e.target.value

        })
        console.log(e.target.value)

    }
    handleSubmit = e => {
        e.preventDefault();

        const newItem = {
            id: this.state.id,
            title: this.state.item
        };

        const updatedItems = [...this.state.items, newItem];

        this.setState({
            items: updatedItems,
            item: "",
            id: uuidv4(),
        });
    };

    handleImageUpload = (e) => {
        this.setState({
            url: e.target.files[0]
        })

    }
    handleChangeComplete = (color) => {
        this.setState({ color: color.hex });
    };
    fontSize = (e) => {
        e.preventDefault();
        var fonts = e.target.value;
        this.setState({
            fontsize: fonts
        })
    }
    changeData = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    makeBold = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        this.setState({
            [e.target.id]: e.target.value

        })
    }
    setBackground = (e) => {
        e.preventDefault();
        var value = e.target.value;
        console.log(value);
        this.setState({
            color: value,
        })
    }
    setFont = (e) => {
        e.preventDefault();
        var font = e.target.value;
        this.setState({
            font: font
        })
    }
    pickColor = (e) => {
        e.preventDefault();
        var pick = e.target.id;
        this.setState({
            color: pick
        })
    }
    changeSelectedItem = (e) => {
        // e.preventDefault();
        var selectedItem = e;
        this.setState({
            selectedColor: selectedItem
        })
        console.log(selectedItem)
        // this.setState({
        //     color: pick
        // })
    }

    changeBackImage = (e) => {
        this.setState({
            backgroundImage: e.target.id

        })
    }

    addText = () => {
        var addList = document.getElementById('information');
        var docstyle = addList.style.display;
        if (docstyle == 'none') addList.style.display = '';

        this.state.addid++;
        console.log(this.state.addid);

        var text = document.createElement('input');
        text.id = 'text' + this.state.addid;
        text.onchange = this.changeData;
        text.placeholder = "add text" + this.state.addid;
        // text.innerHTML = "<input type='text' value='' class='buckinput' name='items[]' placeholder='addtexts' onChange={this.changeData} id='text1' style='padding:5px;' /> <a href='javascript:void(0);' onclick='addInput(" + addid + ")' id='addlink_" + addid + "'></a>";

        addList.appendChild(text);
    }
    closeTab = () => {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

    }


    render() {
        function openTab(tabName) {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active");
            }
            document.getElementById(tabName).style.display = "block";
            // evt.currentTarget.className += " active";

        }
        console.log(this.state.backgroundImage);


        const { color, item, items, font, fontsize, bold, backgroundImage, selectedColor, company, phone, address, email, text1, text2, text3, text4, text5, imageSize } = this.state;
        return (
            <div>

                {this.props.isAuthenticated ?
                    <div id="darkside">

                        <div>

                            {/* sidebar */}
                            {/* ----------------------------------------- */}

                            <div className="sidebar">
                                <Link className="tablinks" id="defaultOpen" onClick={() => openTab('templates')} to="#">Templates</Link>
                                <Link className="tablinks" onClick={() => openTab('background')} to="#">Background</Link>
                                <Link className="tablinks" onClick={() => openTab('text')} to="#">  Text</Link>
                                <Link className="tablinks" onClick={() => openTab('shapes')} to="#">Shapes</Link>
                            </div>

                            {/* templates */}
                            {/* ....................................................... */}

                            <div id="templates" className="tabcontent" style={{ display: "none" }}>
                                <Button variant="danger" onClick={this.closeTab} style={{ float: 'right' }}>X</Button>
                                <h3 >Templates</h3>
                                <img src={cardB1} width="100%" onClick={() => this.setState({ backgroundImage: { cardB1 } })} ></img>
                            </div>

                            {/* background  */}
                            {/* ----------------------------------------------------------- */}



                            <div id="background" className="tabcontent" style={{ display: "block" }}>

                                <Button variant="danger" onClick={this.closeTab} style={{ float: 'right' }}>X</Button>
                                <h3>Background</h3>
                                <p>Choose your background</p>

                                <div>
                                    <select onChange={this.setBackground} id="color-selector">
                                        <option value="none">None</option>
                                        <option value="red">Red</option>
                                        <option value="blue">Blue</option>
                                        <option value="silver">Silver</option>
                                        <option value="yellow">yellow</option>
                                        <option value="azure">Azure</option>
                                        <option value="blueviolet">Blue Violet</option>
                                        <option value="seagreen">Seagreen</option>
                                        <option value="burlywood">Burlywood</option>
                                        <option value="aquamarine">Aquamarine</option>

                                    </select>

                                    <div className="color-grid">
                                        <div className="color-picker red" onClick={this.pickColor} id="red"></div>
                                        <div className="color-picker blue" onClick={this.pickColor} id="blue"></div>
                                        <div className="color-picker orange" onClick={this.pickColor} id="orange"></div>
                                        <div className="color-picker yellow" onClick={this.pickColor} id="yellow"></div>
                                        <div className="color-picker purple" onClick={this.pickColor} id="purple"></div>
                                        <div className="color-picker aliceblue" onClick={this.pickColor} id="aliceblue"></div>
                                        <div className="color-picker orangered" onClick={this.pickColor} id="orangered"></div>
                                        <div className="color-picker brown" onClick={this.pickColor} id="brown"></div>
                                        <div className="color-picker black" onClick={this.pickColor} id="black"></div>
                                        <div className="color-picker white" onClick={this.pickColor} id="white"></div>
                                    </div>
                                    <SketchPicker
                                        color={this.state.background}
                                        onChangeComplete={this.handleChangeComplete}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            </div>

                            {/* text area */}
                            {/* ------------------------------------------------------------------ */}



                            <div id="text" className="tabcontent" style={{ display: "none" }}>
                                <Button variant="danger" onClick={this.closeTab} style={{ float: 'right' }}>X</Button>
                                <h3>Text</h3>
                                <h3>Select Fonts</h3>
                                <select onChange={this.setFont} id="font-selector">
                                    <option value="none">None</option>
                                    <option value="sans-serif">Sans-serif</option>
                                    <option value="Arial">Arial</option>
                                    <option value="courier">Courier</option>
                                    <option value="cursive">Cursive</option>
                                    <option value="Bebas Neue">Bebas Neue</option>
                                    <option value="monospace">Monospace</option>
                                    <option value="times">Times</option>
                                    <option value="Roboto">Roboto</option>
                                    <option value="Dancing Script">Dancing Script</option>
                                    <option value="roboto">Roboto</option>
                                    <option value="Lobster">Lobster</option>
                                    <option value="Rowdies">Rowdies</option>
                                    <option value="Teko">Teko</option>





                                </select>
                                {/* <input type="range" min="0" max="100"></input> */}
                                <select onChange={this.fontSize}>
                                    <option value="10px">10</option>
                                    <option value="14px">14</option>
                                    <option value="16px">16</option>
                                    <option value="18px">18</option>
                                    <option value="20px">20</option>
                                    <option value="24px">24</option>
                                    <option value="30px">30</option>
                                    <option value="60px">60</option>
                                </select>
                                <br></br>

                                <Button variant="warning" className=" mr-sm-1" onClick={this.makeBold} id="bold" value="bold">B</Button>
                                <Button variant="warning" className=" mr-sm-1" onClick={this.makeBold} id="italic" value="bold">I</Button>
                                <Button variant="warning" onClick={this.makeBold} id="underline" value="bold">U</Button>


                                <div id="information" >
                                    <span>Text 1</span><br />
                                    <input type='text' placeholder="Text 1" onChange={this.changeData} id="company"></input><br />
                                    <span>Text 2</span><br />
                                    <input type='text' placeholder="Text 2" onChange={this.changeData} id="phone"></input><br />
                                    <span>Text 3</span><br />
                                    <input type='text' placeholder="Text 3" onChange={this.changeData} id="address"></input><br />
                                    <span>Text 4</span><br />
                                    <input type='text' placeholder="Text 4" onChange={this.changeData} id="email"></input>
                                    <br />
                                    <br />
                                    {/* <button onClick={this.addText}>Add</button> */}
                                    <Button variant="success" className=" mb-sm-3" size="sm" onClick={this.addText}>Add text <i className="fa fa-plus"></i></Button>
                                    <br></br>
                                </div>
                            </div>

                            {/* Shapes  */}
                            {/* --------------------------------------------------------------------------------------- */}



                            <div id="shapes" className="tabcontent" style={{ display: "none" }}>
                                <Shape />

                            </div>



                        </div>
                        <CanvaNew
                            changeFont={font}
                            changeFsize={fontsize}
                            cBold={bold}
                            changeBack={color}
                            selectedColor={selectedColor}
                            company={company}
                            number={phone}
                            cardBackground={cardB1}
                            address={address}
                            email={email}
                            text1={text1}
                            text2={text2}
                            text3={text3}
                            text4={text4}
                            text5={text5}
                            item={item}
                            backgroundTemplate={backgroundImage}
                            items={items}
                            imageSize={imageSize} />


                        <Text
                            fontsize={this.handleFont}
                            selected={this.changeSelectedItem}
                            imageUpload={this.handleImageUpload}
                        />
                    </div > :
                    <div className="login" style={{ textAlign: "center", marginTop: "100px" }}>
                        <h1>  Please login to continue.....</h1>
                        <Button variant="outline-secondary" className="mr-sm-4" >
                            <NavItem>
                                <LoginModal />
                            </NavItem></Button>
                    </div>
                }
            </div >
        );
    }
}



// export default Sidebar;
const mapStateToProps = state => (
    {
        isAuthenticated: state.auth.isAuthenticated,
    }
);

export default connect(
    mapStateToProps,
    {}
)(Sidebar);
