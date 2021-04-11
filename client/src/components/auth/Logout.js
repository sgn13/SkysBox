import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'reactstrap';
import { logout } from '../flux/action/authAction';
import Proptypes from 'prop-types'
import { Button } from 'react-bootstrap';


export class Logout extends Component {
    static propTypes = {
        logout: Proptypes.func.isRequired
    };
    render() {
        const { isAuthenticated, user } = this.props.auth;

        return (
            <Fragment>
                <NavLink onClick={this.props.logout} href="#" style={{ color: 'white' }}>
                    {user ? `Welcome, ${user.name}` : ''} <Button type="button" class="btn btn-danger">Logout</Button>
                </NavLink>
            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, { logout })(Logout);
