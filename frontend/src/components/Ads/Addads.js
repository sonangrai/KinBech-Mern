import React, { Fragment, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { postad } from "../../actions/ads";
import Alert from "../layouts/Alert";

function Addads({ postad }) {
  const [data, setdata] = useState("");

  const { title, description, condition, price, pricenegotiable } = data;

  const onChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => setdata({ ...data, fimg: e.target.files[0] });

  const onSubmit = (e) => {
    e.preventDefault();
    postad(data);
  };

  return (
    <Fragment>
      <div className="mycontainer p-3">
        <div className="row">
          <div className="col-12">
            <div className="add-form">
              <h2>Add New Ad</h2>
              <Form onSubmit={(e) => onSubmit(e)} encType="multipart/form-data">
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    name="title"
                    value={title}
                    onChange={(e) => onChange(e)}
                  />
                  <Form.Text className="text-muted">Available</Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Condition</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Condition"
                    name="condition"
                    value={condition}
                    onChange={(e) => onChange(e)}
                  />
                  <Form.Text className="text-muted">
                    Condition of Goods
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    name="price"
                    value={price}
                    onChange={(e) => onChange(e)}
                  />
                  <Form.Text className="text-muted">Price of Goods</Form.Text>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Price Negotiable</Form.Label>
                  <Form.Control
                    as="select"
                    name="pricenegotiable"
                    value={pricenegotiable}
                    onChange={(e) => onChange(e)}
                  >
                    <option value="null">--Select--</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    name="description"
                    value={description}
                    onChange={(e) => onChange(e)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.File
                    id="exampleFormControlFile1"
                    label="Featured Image"
                    name="featimg"
                    onChange={(e) => onFileChange(e)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Add Ads
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Alert />
    </Fragment>
  );
}

Addads.propTypes = {
  postad: PropTypes.func.isRequired,
};

export default connect(null, { postad })(Addads);
