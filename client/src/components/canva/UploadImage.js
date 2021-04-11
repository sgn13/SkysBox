import React from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, NavItem, Form } from 'react-bootstrap';
import LoginModal from '../../components/auth/LoginModel'

class ReactUploadImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool,


    };
    onFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        console.log(this.props)
        axios.post("/api/img", formData, config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
            });
    }
    onChange(e) {
        this.setState({ file: e.target.files[0] });
    }
    onSubmit(e) {
        axios.get("/api/img/");

    }

    render() {
        return (
            <div>
                {this.props.isAuthenticated ?
                    <div className="Upload container mt-5 p-5">
                        <form onSubmit={this.onFormSubmit}>
                            <h1>File Upload</h1>
                            <input type="file" name="myImage" onChange={this.onChange} />
                            <button type="submit" className="btn btn-secondary">Upload</button>
                        </form>
                        <button onSubmit={this.onSubmit} className=" mt-4 btn btn-secondary">Show Your Cards</button>
                    </div>
                    :
                    <div className="login" style={{ textAlign: "center", marginTop: "100px" }}>
                        <h1>  Please login to continue.....</h1>
                        <Button variant="outline-secondary" className="mr-sm-4" >
                            <NavItem>
                                <LoginModal />
                            </NavItem></Button>
                    </div>
                }
            </div>
        )
        console.log("Upload");
    }
}
const mapStateToProps = state => (
    {
        isAuthenticated: state.auth.isAuthenticated,

    }
);

export default connect(
    mapStateToProps,
    {}
)(ReactUploadImage);