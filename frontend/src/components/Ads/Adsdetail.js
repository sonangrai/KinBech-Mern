import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { singleAd } from "../../actions/ads";
import { deleteComment } from "../../actions/comment";
import CommentForm from "./CommentForm";
import Alert from "../layouts/Alert";
import Reply from "./Reply";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Axios from "axios";

const Adsdetail = ({
  auth,
  id,
  uid,
  comment_id,
  singleAd,
  deleteComment,
  ads: { ad, loading },
  match,
}) => {
  useEffect(() => {
    singleAd(match.params.id);
    deleteComment(id);
  }, [singleAd, match, deleteComment, id, comment_id]);

  const [user, setuser] = useState(null);

  const getusr = (uid) => {
    try {
      Axios.get(`/api/users/${uid}`).then((res) => {
        const data = res.data;
        setuser(data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <div className="mycontainer p-3">
        <div className="row">
          <div className="col-12">
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>{ad.title}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="col-lg-8">
            <h2 className="title">{ad.title}</h2>
            <div className="ads-desc">
              <div className="desc">
                <div className="price">
                  <strong>Rs. {ad.price}</strong>
                </div>
                <div className="cond">{ad.condition}</div>
                <div className="nego">
                  Price Negotiable: <span>{ad.pricenegotiable}</span>
                </div>
                <div className="descriptionad">
                  <h3>Description:</h3>
                  {ad.description}
                </div>
                {auth.user !== null && (
                  <div>
                    {auth.user._id === ad.user ? (
                      <span>
                        {ad.adstatus === "0" ? (
                          <span className="dpr">Not Approved</span>
                        ) : (
                          <span className="apr">Approved</span>
                        )}
                      </span>
                    ) : null}
                  </div>
                )}
                <div className="datebx">
                  <span>Published at: {ad.date}</span>
                </div>
              </div>
              {ad !== null && (
                <div className="comment">
                  <h3>Ads Speak</h3>
                  {ad.comments ? (
                    <div className="citem">
                      {ad.comments.map((com) => (
                        <div className="item" key={com._id}>
                          <div className="comentitem">
                            {getusr(com.user)}
                            <div className="avatar">
                              {user !== null && (
                                <img
                                  className="avt"
                                  src={user.avatar}
                                  alt={user.username}
                                />
                              )}
                              <span className="cmtxt">{com.commentext}</span>
                            </div>
                            {!auth.loading && ad.user === auth.user._id && (
                              <button
                                onClick={() => deleteComment(ad._id, com._id)}
                                type="button"
                                className="btn btn-danger addel"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                          <span className="reply">Reply</span>
                          <small>
                            {com.reply
                              ? com.reply
                              : !auth.loading &&
                                ad.user === auth.user._id && (
                                  <Reply
                                    key={com._id}
                                    id={ad._id}
                                    comment_id={com._id}
                                  />
                                )}
                          </small>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <i>No comment</i>
                  )}
                </div>
              )}
              {auth.isAuthenticated ? (
                <div className="adsform">
                  <CommentForm id={ad._id} />
                </div>
              ) : (
                <span className="link">
                  <Link to="/login">Login</Link> To Speak to this Seller
                </span>
              )}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="gallery">
              <img src={`../uploads/img/${ad.fimg}`} alt="" />
            </div>
          </div>
        </div>
      </div>
      <Alert />
    </Fragment>
  );
};
Adsdetail.propTypes = {
  singleAd: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  ads: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  ads: state.ads,
  comment: state.comment,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  singleAd,
  deleteComment,
})(Adsdetail);
