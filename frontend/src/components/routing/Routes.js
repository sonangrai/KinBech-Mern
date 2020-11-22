import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Home from "../Home";
import Addads from "../Ads/Addads";
import Pending from "../Ads/Pending";

import Adsdetail from "../Ads/Adsdetail";
import Myads from "../Ads/Myads";
import Profile from "../auth/Profile";
import Editprofile from "../auth/Editprofile";
import AddCat from "../Ads/AddCat";

function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/logout" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/ads/:id" component={Adsdetail} />
      <Route exact path="/addads" component={Addads} />
      <Route exact path="/pending" component={Pending} />
      <Route exact path="/myads" component={Myads} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/eprofile" component={Editprofile} />
      <Route exact path="/addcat" component={AddCat} />
    </Switch>
  );
}

export default Routes;
