import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import Alert from "../layouts/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { editprofile } from "../../actions/profile";

export const Editprofile = ({ auth, profile, editprofile, id }) => {
  const [data, setdata] = useState({
    fullname: "",
    hidenumber: "",
    area: "",
    city: "",
    phone: "",
  });
  const { fullname, hidenumber, area, city, phone } = data;

  const onChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    editprofile(auth.user._id, data);
  };

  return (
    <Fragment>
      <div className="mycontainer">
        <div className="row">
          <div className="col-12">
            {auth.user !== null && (
              <Form onSubmit={(e) => onSubmit(e)}>
                <Form.Group>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={profile.fullname}
                    value={fullname}
                    name="fullname"
                    onChange={(e) => onChange(e)}
                  />
                  <Form.Text className="text-muted">Available</Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={profile.phone}
                    value={phone}
                    name="phone"
                    onChange={(e) => onChange(e)}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Area</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={profile.area}
                    value={area}
                    name="area"
                    onChange={(e) => onChange(e)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={profile.city}
                    value={city}
                    name="city"
                    onChange={(e) => onChange(e)}
                  />
                </Form.Group>

                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Label>Hide Number or Not</Form.Label>
                  <Form.Control
                    as="select"
                    value={hidenumber}
                    name="hidenumber"
                    onChange={(e) => onChange(e)}
                  >
                    <option value="yes">yes</option>
                    <option value="no">no</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </Form>
            )}
          </div>
        </div>
      </div>
      <Alert />
    </Fragment>
  );
};

Editprofile.propTypes = {
  profile: PropTypes.object.isRequired,
  editprofile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { editprofile })(Editprofile);
