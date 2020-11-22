import React, { Fragment, useEffect } from "react";
import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getads, approveAds } from "../../actions/ads";
import Alert from "../layouts/Alert";

function Pending({ getads, approveAds, ads: { ads, loading } }) {
  useEffect(() => {
    getads();
  }, [getads]);
  return (
    <Fragment>
      <div className="mycontainer p-3">
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
              ad.adstatus === "0" ? (
                <tr key={ad._id}>
                  <td>{ad._id}</td>
                  <td>{ad.title}</td>
                  <td>{ad.pricenegotiable}</td>
                  <td>{ad.price}</td>
                  <td>
                    <Link to={`/ads/${ad._id}`} target="_blank">
                      View This
                    </Link>
                    <button
                      onClick={() => approveAds(ad._id)}
                      type="button"
                      className="btn btn-secondary"
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </Table>
      </div>
      <Alert />
    </Fragment>
  );
}

Pending.proppropTypes = {
  getads: PropTypes.func.isRequired,
  approveAds: PropTypes.func.isRequired,
  ads: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  ads: state.ads,
});
export default connect(mapStateToProps, { getads, approveAds })(Pending);
