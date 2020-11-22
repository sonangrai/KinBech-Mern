import React, { Fragment, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import Alert from "../layouts/Alert";
import Loginimg from "../../assets/img/login-img.png";

const Login = ({ login, isAuthenticated }) => {
  document.title = "Login - KinBech";
  const [data, setdata] = useState({
    username: "",
    password: "",
  });

  const { username, password } = data;

  const onChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login(username, password);
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <div className="mycontainer login">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-12">
            <div className="lg">
              <img src={Loginimg} alt="" />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <div className="lg-form">
              <Form onSubmit={(e) => onSubmit(e)} className="loginform">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Valid Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    name="username"
                    onChange={(e) => onChange(e)}
                    placeholder="Enter email"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    name="password"
                    onChange={(e) => onChange(e)}
                    placeholder="Password"
                    required
                  />
                </Form.Group>
                <Button className="primary-btn mt-4" type="submit">
                  Login
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Alert />
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
