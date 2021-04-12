import React, { Component } from 'react';
import { Form } from 'react-bootstrap'

class UploadImage extends Component {

    state = {
        filterURL: '',
        img: ''
    }


    render() {


        return (
            <div>
                <Form>
                    <Form.File
                        id="custom-file"
                        label="Choose image"
                        custom
                        onChange={this.props.handleChange}
                    // name="img"
                    // defaultValue={this.state.img}

                    />
                </Form>
            </div>
        );
    }
}

export default UploadImage;