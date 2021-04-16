import React from "react";
import axios from "axios";
import { render } from "@testing-library/react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, NavItem } from "react-bootstrap";
import LoginModal from "../../components/auth/LoginModel";

class ReactUploadImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        payload: PropTypes.string,
    };
    onFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", this.state.file);
        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };
        const id = this.props.payload._id;
        axios.post(`/api/img/abc/${id}`, formData, config)
            .then((response) => {
                alert("The file is successfully uploaded");
            })
            .catch((error) => { });
    }
    onChange(e) {
        this.setState({ file: e.target.files[0] });
    }
    onSubmit(e) {
        axios.get("/api/img/");
    }

    render() {
        console.log(this.props.payload);
        //console.log(this.props)
        return (
            <div className="container mt-5">
                {this.props.isAuthenticated ? (
                    <div className="Upload">
                        <form onSubmit={this.onFormSubmit}>
                            <h2 className="my-3">File Upload</h2>
                            <input type="file" name="myImage" onChange={this.onChange} />
                            <Button variant="outline-secondary" type="submit" className="mr-sm-4">
                                Upload
                            </Button><br />
                        </form>
                        <Button variant="outline-secondary" onSubmit={this.onSubmit}>Show Your Cards</Button>
                    </div>
                ) : (
                        <div
                            className="login"
                            style={{ textAlign: "center", marginTop: "100px" }}
                        >
                            <h2> Please login to continue.....</h2>
                            <Button variant="outline-secondary" className="mr-sm-4">
                                <NavItem>
                                    <LoginModal />
                                </NavItem>
                            </Button>
                        </div>
                    )}
            </div>
        );
        console.log("Upload");
    }
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    payload: state.auth.user,
});

export default connect(mapStateToProps, {})(ReactUploadImage);