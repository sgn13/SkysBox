import React, { Component } from 'react';
import Template from '../templates/template';
import Text from '../sidebar/text'
import Draggable from "react-draggable";
import { Button } from 'react-bootstrap';
class BannerCanva extends Component {
    state = {
        edit: false,

        x: '',
        y: '',
        width: '',
        height: '',
        style: '',
        fsize: '30px',
        color: '',
        font: '',
        activeDrags: 0,
        deltaPosition: {
            x: 0, y: 0
        }
    }


    // Editing text
    //////////////////////////////
    fontsize = (e) => {
        this.setState({
            fsize: e.target.value
        })
        console.log(e.target.value)
    }
    handleDrag = (e, ui) => {
        const { x, y } = this.state.deltaPosition;
        this.setState({
            deltaPosition: {
                x: x + ui.deltaX,
                y: y + ui.deltaY,
            }
        });
    };

    editMode = () => {
        this.setState({
            edit: !this.state.edit
        })
    }
    cancelEdit = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    okEdit = () => {
        this.setState({
            edit: false,

        })
    }
    renderEditView = () => {
        return (<div><input defaultValue={this.props.company}></input>
            <button onClick={this.cancelEdit}>X</button>
            <button onClick={this.okEdit}>ok</button></div>)
    }
    renderDefaulView = () => {
        return <p onDoubleClick={this.editMode} style={{ fontFamily: this.props.changeFont, color: 'black' }}>{this.props.company}</p>
    }
    changeBackColor = (e) => {
        var a = e.target.value;

        console.log(a)

    }
    emailSelect = () => {
        this.setState({
            edit: !this.state.edit
        })

    }
    SeletectText = (e) => {
        console.log(e);
        this.setState({
            color: e
        })
    }
    selectFont = (e) => {
        this.setState({
            font: e
        })

    }
    toggleDraggable = () =>
        this.setState(prevState => ({ disabled: !this.state.disabled }));

    render() {
        return (
            <div className="canva-board">
                {/* <Text selected={this.SeletectText} selectFont={this.selectFont} fontsize={this.fontsize} /> */}



                <div>x: {this.state.deltaPosition.x.toFixed(0)}, y: {this.state.deltaPosition.y.toFixed(0)}</div>





                <div className='containers  ' style={{ width: '400px', height: '500px', border: '1px solid black', position: 'absolute', margin: '200px' }}>

                    <Draggable bounds="parent" onDrag={this.handleDrag}  >
                        <div>
                            {this.props.display && <img src={URL.createObjectURL(this.props.display)} style={{ width: '400px', height: '500px' }}></img>}
                        </div>
                    </Draggable>
                    <Draggable bounds="parent" onDrag={this.handleDrag}  >
                        <div style={{ width: 150, position: 'relative' }}>
                            <p style={{ fontFamily: this.props.changeFont, color: 'black' }} onDoubleClick={this.emailSelect}>{this.props.number}</p>
                        </div>
                    </Draggable>
                    <Draggable bounds="parent" onDrag={this.handleDrag}  >
                        <div style={{ width: 150, position: 'relative' }}>
                            <p style={{ fontFamily: this.props.changeFont, color: 'black' }} onDoubleClick={this.emailSelect}>{this.props.address}</p>
                        </div>
                    </Draggable>
                    {this.state.edit ? <Draggable bounds="parent" onDrag={this.handleDrag}  >
                        <div style={{ width: 150 }}>
                            <p style={{ fontFamily: this.props.changeFont, fontFamily: this.state.font, fontsize: this.state.fsize, color: "red" }} onDoubleClick={this.emailSelect}>{this.props.email}</p>
                        </div>
                    </Draggable> : <Draggable bounds="parent" onDrag={this.handleDrag}  >
                            <div style={{ width: 150 }}>
                                <p style={{ fontFamily: this.props.changeFont, color: 'black', color: this.state.color, fontFamily: this.state.font, }} onDoubleClick={this.emailSelect}>{this.props.email}</p>
                            </div>
                        </Draggable>}
                    {/* 
                    <Draggable bounds="parent" onDrag={this.handleDrag}  >
                        <div style={{ width: 150 }}>
                            <p style={{ fontFamily: this.props.changeFont, color: 'black' }} onDoubleClick={this.emailSelect}>{this.props.email}</p>
                        </div>
                    </Draggable> */}
                    {this.state.edit ? <Draggable bounds="parent" onDrag={this.handleDrag}  >
                        <div style={{ width: 150, position: 'relative' }}>
                            <p style={{ fontFamily: this.props.changeFont, color: this.state.color }} onDoubleClick={this.emailSelect}>{this.props.text1}</p>
                        </div>
                    </Draggable> : <Draggable bounds="parent" onDrag={this.handleDrag}  >
                            <div style={{ width: 150, position: 'relative' }}>
                                <p style={{ fontFamily: this.props.changeFont, color: 'black' }} onDoubleClick={this.emailSelect}>{this.props.text1}</p>
                            </div>
                        </Draggable>}
                    <Draggable bounds="parent" onDrag={this.handleDrag}  >
                        <div style={{ width: 150, position: 'relative' }}>
                            <p style={{ fontFamily: this.props.changeFont, color: 'black' }} onDoubleClick={this.emailSelect}>{this.props.text2}</p>
                        </div>
                    </Draggable>
                    <Draggable bounds="parent" onDrag={this.handleDrag}  >
                        <div style={{ width: 150, position: 'relative' }}>
                            <p style={{ fontFamily: this.props.changeFont, color: 'black' }} onDoubleClick={this.emailSelect}>{this.props.text3}</p>
                        </div>
                    </Draggable>
                    <Draggable bounds="parent" onDrag={this.handleDrag}  >
                        <div style={{ width: 150, position: 'relative' }}>
                            <p style={{ fontFamily: this.props.changeFont, color: 'black' }} onDoubleClick={this.emailSelect}>{this.props.text4}</p>
                        </div>
                    </Draggable>
                    <Draggable bounds="parent" onDrag={this.handleDrag}  >
                        <div style={{ width: 150, position: 'relative' }}>
                            <p style={{ fontFamily: this.props.changeFont, color: 'black' }} onDoubleClick={this.emailSelect}>{this.props.text5}</p>
                        </div>
                    </Draggable>
                    <Draggable bounds="parent" onDrag={this.handleDrag}  >
                        <div style={{ width: 150, position: 'relative' }}>
                            <p style={{ fontFamily: this.props.changeFont, color: 'black' }} onDoubleClick={this.emailSelect}>{this.props.text6}</p>
                        </div>
                    </Draggable>

                </div>




            </div >
        );
    }
}

export default BannerCanva;