import React, { Fragment, useState } from "react";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { postreply } from "../../actions/comment";
import { connect } from "react-redux";

function Reply({ id, comment_id, postreply }) {
  const [data, setdata] = useState({
    commentext: "",
  });

  const { commentext } = data;
  const onChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    postreply(id, comment_id, commentext);
  };

  return (
    <Fragment>
      <Form onSubmit={(e) => onSubmit(e)}>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Reply Buyer</Form.Label>
          <Form.Control
            as="textarea"
            value={commentext}
            name="commentext"
            onChange={(e) => onChange(e)}
            rows="3"
          />
        </Form.Group>
        <Button variant="secondary" type="submit">
          Reply
        </Button>
      </Form>
    </Fragment>
  );
}

Reply.propTypes = {
  postreply: PropTypes.func.isRequired,
};

export default connect(null, { postreply })(Reply);
