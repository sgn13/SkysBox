import React, { Component } from 'react';
import ColorPicker from './color-picker/colorpicker'
import '../../css/text.css'


class Text extends Component {

    state = {
        color: '',
        font: ''

    }

    pickColor = (e) => {
        e.preventDefault();
        var pick = e.target.id;
        this.setState({
            color: pick,
        })
        this.props.selected(pick);
        // console.log(pick)
    }
    setFont = (e) => {
        e.preventDefault();
        var font = e.target.value;
        this.setState({
            font: font
        })
        this.props.selectFont(font)
    }
    changeTextColor = (e) => {
        // e.preventDefault();
        this.setState({
            color: e.hex
        })
        this.props.selected(e.hex);
        // console.log(e.hex)

    }

    render() {


        return (
            <div className="toolbar" >
                <div className="text-color-grid">
                    <div className="text-color-picker red" onClick={this.pickColor} id="red"></div>
                    <div className="text-color-picker blue" onClick={this.pickColor} id="blue"></div>
                    <div className="text-color-picker orange" onClick={this.pickColor} id="orange"></div>
                    <div className="text-color-picker yellow" onClick={this.pickColor} id="yellow"></div>
                    <div className="text-color-picker purple" onClick={this.pickColor} id="purple"></div>
                    <div className="text-color-picker aliceblue" onClick={this.pickColor} id="aliceblue"></div>
                    <div className="text-color-picker orangered" onClick={this.pickColor} id="orangered"></div>
                    <div className="text-color-picker brown" onClick={this.pickColor} id="brown"></div>
                    <div className="text-color-picker black" onClick={this.pickColor} id="black"></div>
                    <div className="text-color-picker white" onClick={this.pickColor} id="white"></div>
                </div>
                <select onChange={this.setFont} id="font-selector" >
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
                <input type="range" min="0px" max="150px" style={{ marginTop: 'auto' }} onChange={this.props.fontsize}></input>
                <input className="fileChoose" type="file" style={{ marginTop: "auto" }} onChange={this.props.imageUpload}></input>
                <ColorPicker getTextColor={this.changeTextColor} />
                {/* <Example /> */}
                {/* <CanComponent /> */}


                {/* <Canva /> */}
            </div>);
    }
}
// class Example extends React.Component {
//     render() {
//         return (
//             <div>
//                 <ReactToPrint
//                     trigger={() => <a href="#">Print this out!</a>}
//                     content={() => this.componentRef}
//                 />
//                 <Text ref={el => (this.componentRef = el)} />
//             </div>
//         );
//     }
// }

export default Text;