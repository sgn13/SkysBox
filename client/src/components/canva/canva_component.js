import React, { Component } from 'react';
import CanvaNew from './canvaNew'
import ReactToPrint from 'react-to-print';

class CanComponent extends Component {
    state = {}
    render() {
        return (
            <div>
                <CanvaNew />
                sdfdsk
            </div>


        );
    }
}
class Example extends React.Component {
    render() {
        return (
            <div>
                <ReactToPrint
                    trigger={() => <a href="#">Print this out!</a>}
                    content={() => this.componentRef}
                />
                <CanComponent ref={el => (this.componentRef = el)} />
            </div>
        );
    }
}

export default Example;