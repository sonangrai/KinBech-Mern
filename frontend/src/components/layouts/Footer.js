import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Fragment>
      <div className="footer">
        <div className="mycontainer">
          <div className="row">
            <div className="col-12">
              <div className="quick-links">
                <h2>Quick Links</h2>
                <ul>
                  <li>
                    <Link to="/home">Home</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/shop">Shop</Link>
                  </li>
                </ul>
              </div>
              <span
                dangerouslySetInnerHTML={{
                  __html: "&copy;" + new Date().getFullYear() + " Sonahang",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Footer;
