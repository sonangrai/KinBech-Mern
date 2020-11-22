import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import { setAlert } from "../../actions/alert";
import Alert from "../layouts/Alert";
import Loginimg from "../../assets/img/reg-img.png";

function Register({ register, setAlert, isAuthenticated }) {
  document.title = "Register - Kinbech";
  const [data, setdata] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { username, email, password, password2 } = data;

  const onChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ username, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <div className="mycontainer register">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-12">
            <Form onSubmit={(e) => onSubmit(e)}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter email"
                  value={username}
                  name="username"
                  onChange={(e) => onChange(e)}
                />
                <Form.Text className="text-muted">Available</Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  name="email"
                  onChange={(e) => onChange(e)}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password2}
                  name="password2"
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={password}
                  name="password"
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>
              <Button className="primary-btn mt-4" type="submit">
                Register
              </Button>
            </Form>
          </div>

          <div className="col-lg-6 col-md-6 col-12">
            <div className="lg">
              <img src={Loginimg} alt="" />
            </div>
          </div>
        </div>
      </div>
      <Alert />
    </Fragment>
  );
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
