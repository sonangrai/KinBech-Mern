import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getads } from "../../actions/ads";
import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const Myads = ({ getads, ads: { ads, loading }, auth }) => {
  useEffect(() => {
    getads();
  }, [getads]);
  return (
    <Fragment>
      <div className="container p-3">
        <h3>Ads To Review</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Negotiable</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) =>
              ad.user === auth.user._id ? (
                <tr key={ad._id}>
                  <td>{ad._id}</td>
                  <td>{ad.title}</td>
                  <td>{ad.pricenegotiable}</td>
                  <td>{ad.price}</td>
                  <td>
                    <Link to={`/ads/${ad._id}`} target="_blank">
                      View This
                    </Link>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
};

Myads.protoTypes = {
  getads: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  ads: state.ads,
  auth: state.auth,
});

export default connect(mapStateToProps, { getads })(Myads);
