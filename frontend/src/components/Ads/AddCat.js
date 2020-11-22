import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "../layouts/Alert";
import PropTypes from "prop-types";
import { addcat, getallcat } from "../../actions/ads";

export const AddCat = ({ addcat, getallcat, categories }) => {
  useEffect(() => {
    getallcat();
  }, [getallcat]);

  const [data, setdata] = useState("");

  const { category } = data;

  const onChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addcat(data);
  };
  return (
    <Fragment>
      <div className="mycontainer p-3">
        <div className="row">
          <div className="col-12">
            <h3>Add Category</h3>
          </div>
          <div className="col-12">
            <Form onSubmit={(e) => onSubmit(e)} inline>
              <Form.Group>
                <Form.Control
                  className="mr-sm-2"
                  type="text"
                  placeholder="Enter Category"
                  name="category"
                  value={category}
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Add Category
              </Button>
            </Form>
            <h3>Current Category</h3>
            {categories != null && (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Category</th>
                    <th>Sub Categories</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat) => (
                    <tr key={cat._id}>
                      <td>{cat._id}</td>
                      <td>{cat.category}</td>
                      <td>
                        <ul>
                          {cat.subcategory.map((scat) => (
                            <li>{scat.subcatname}</li>
                          ))}
                        </ul>
                      </td>
                      <td>
                        <Link to={`/ads/${cat._id}`} target="_blank">
                          Add Sub Category
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </div>
      <Alert />
    </Fragment>
  );
};

AddCat.propTypes = {
  addcat: PropTypes.func.isRequired,
  getallcat: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  categories: state.category.category,
});

export default connect(mapStateToProps, { addcat, getallcat })(AddCat);
