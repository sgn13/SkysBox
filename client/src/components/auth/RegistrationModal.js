import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../components/flux/action/authAction'
import { clearErrors } from '../../components/flux/action/errorAction'



class RegisterModal extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    password2: '',
    msg: null
  };
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired

  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error != prevProps.error) {
      //Check for register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });

      }
    }

    //If authenticated close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    //Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password, password2 } = this.state;

    //Create user object
    const newUser = {
      name,
      email,
      password,
      password2
    };
    console.log(newUser);
    //Attempt to register
    this.props.register(newUser);

  };
  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#" style={{ padding: '0px' }}>
          Register
          </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ?
              (<Alert color="danger">{this.state.msg}</Alert>)
              : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  value={this.state.name}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  className="mb-3"
                  onChange={this.onChange}
                />

                <Label for="email">Email</Label>
                <Input
                  value={this.state.email}

                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="mb-3"
                  onChange={this.onChange}
                />

                <Label for="password">Password</Label>
                <Input
                  value={this.state.password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="password2">Retype Password</Label>
                <Input
                  value={this.state.password2}
                  type="password"
                  name="password2"
                  id="password2"
                  placeholder="Re-type Password"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: '2rem' }} block>
                  Register
                  </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );

  }
}

const mapStateToProps = state => (
  {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  }
);

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(RegisterModal);