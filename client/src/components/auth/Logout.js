import React, { Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "reactstrap";
import { logout } from "../flux/action/authAction";
import Proptypes from "prop-types";
import { Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';


const Logout = (props) => {

  let history = useHistory();
  const handleLogout = () => {
    props.logout()
    history.push('/')
  }
  const { isAuthenticated, user } = props.auth;

  return (
    <Fragment>
      <NavLink
        onClick={handleLogout}
        href="#"
        style={{ color: "white" }}
      >
        {user ? `Welcome, ${user.name}` : ""}{" "}
        <Button type="button" class="btn btn-danger">
          Logout
                  </Button>
      </NavLink>
    </Fragment>
  )

}
// Logout.propTypes = {
//   logout: Proptypes.func.isRequired,
// };
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Logout);
