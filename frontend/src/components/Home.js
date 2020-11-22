import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { sliderAds } from "../actions/ads";
import Loader from "../components/layouts/Loader";

const Home = ({ sliderAds, ads: { ads, loading } }) => {
  document.title = "KinBech - Welcome";
  useEffect(() => {
    sliderAds();
  }, [sliderAds]);
  return (
    <Fragment>
      <div className="hero">
        {ads.length ? (
          <OwlCarousel
            className="owl-theme mainslider"
            loop
            margin={10}
            nav={false}
            dots={false}
            items="1"
            autoplay
          >
            {ads.map((ad) =>
              ad.adstatus === "1" ? (
                <div className="item sitem" key={ad._id}>
                  <div className="adinfo">
                    <div>
                      <h4>{ad.title}</h4>
                      <span className="price">NRs {ad.price}</span>
                      <span className="used">({ad.condition})</span>
                      <Link to={`/ads/${ad._id}`} className="dark-btn mt-4">
                        View This
                      </Link>
                    </div>
                  </div>
                  <div className="ad-img">
                    <img src={`../uploads/img/${ad.fimg}`} alt="" />
                  </div>
                </div>
              ) : null
            )}
          </OwlCarousel>
        ) : (
          <Loader />
        )}
      </div>
    </Fragment>
  );
};

Home.propTypes = {
  sliderAds: PropTypes.func.isRequired,
  ads: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  ads: state.ads,
});
export default connect(mapStateToProps, { sliderAds })(Home);
