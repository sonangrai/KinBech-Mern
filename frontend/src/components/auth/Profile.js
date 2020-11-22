import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getprofile } from "../../actions/profile";
import Jumbotron from "react-bootstrap/Jumbotron";
import { Link } from "react-router-dom";

function Profile({ auth, profile }) {
  return (
    <Fragment>
      <div className="mycontainer">
        <Jumbotron>
          {auth.user !== null && (
            <div className="uinfo">
              <img src={auth.user.avatar} alt={auth.user.email} />
              <h4>{auth.user.email}</h4>
            </div>
          )}
          <h1>{profile.fullname}</h1>
          <h2>{profile.phone}</h2>
          <h2>{profile.area}</h2>
          <h2>{profile.city}</h2>
          <h2>{profile.hidenumber}</h2>
        </Jumbotron>
        <Link class="btn btn-primary" to="/eprofile">
          Edit Profile
        </Link>
      </div>
    </Fragment>
  );
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile.profile,
});
export default connect(mapStateToProps, { getprofile })(Profile);
