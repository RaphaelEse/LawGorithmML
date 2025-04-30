import React from "react";
import { createRoot } from "react-dom/client";     // ← change here

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "layouts/Admin.js";

const container = document.getElementById("root");  // get your root node
const root = createRoot(container);                  // create a root
root.render(                                        // use root.render instead of ReactDOM.render
  <BrowserRouter>
    <Switch>
      <Route path="/" render={(props) => <AdminLayout {...props} />} />
      {/* <Redirect from="/" to="/homepage" /> */}
    </Switch>
  </BrowserRouter>
);
