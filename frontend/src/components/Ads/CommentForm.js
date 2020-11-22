import React, { Fragment, useState } from "react";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { postcomment } from "../../actions/comment";
import { connect } from "react-redux";

function Addads({ id, postcomment }) {
  const [data, setdata] = useState({
    commentext: "",
  });

  const { commentext } = data;
  const onChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    postcomment(id, commentext);
  };

  return (
    <Fragment>
      <Form onSubmit={(e) => onSubmit(e)}>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Speak to Seller</Form.Label>
          <Form.Control
            as="textarea"
            value={commentext}
            name="commentext"
            onChange={(e) => onChange(e)}
            rows="3"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Comment
        </Button>
      </Form>
    </Fragment>
  );
}

Addads.propTypes = {
  postcomment: PropTypes.func.isRequired,
};

export default connect(null, { postcomment })(Addads);
