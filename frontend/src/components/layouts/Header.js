import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout, loadUser } from "../../actions/auth";
import Dropdown from "react-bootstrap/Dropdown";

const Header = ({
  logout,
  auth: { isAuthenticated, user, loading },
  loadUser,
}) => {
  useEffect(() => {
    loadUser();
  }, [logout, loadUser]);

  return (
    <Fragment>
      <div className="container-fluid header">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-12">
            <div className="logo">
              <Link to="/">Kin-Bech</Link>
            </div>
          </div>
          <div className="col-lg-8 col-md-6 col-12">
            <div className="mainmenu">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                {user !== null && (
                  <li>
                    {user.usertype === "admin" ? (
                      <Link to="/pending">Pending</Link>
                    ) : (
                      <Link to="/myads">My Ads</Link>
                    )}
                  </li>
                )}
                <li>
                  <Link to="/help">Help</Link>
                </li>
                <li>
                  {isAuthenticated ? (
                    <Link to="/addads">Add ADS</Link>
                  ) : (
                    <Link to="/register" className="sebtn">
                      Register
                    </Link>
                  )}
                </li>
                {isAuthenticated && (
                  <li>
                    <Link to="/addcat">Add Category</Link>
                  </li>
                )}
                <li>
                  {isAuthenticated ? (
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="primary"
                        id="dropdown-basic"
                        className="userinf"
                      >
                        {user !== null && (
                          <img
                            className="useravt"
                            src={user.avatar}
                            alt={user.username}
                          />
                        )}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <Link to="/profile">Profile</Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to="/logout" onClick={logout}>
                            Logout
                          </Link>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <Link to="/login" className="prbtn">
                      Login
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout, loadUser })(Header);
