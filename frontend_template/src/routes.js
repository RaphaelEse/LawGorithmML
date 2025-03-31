/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import VisTest from "views/VisTest.js";

const dashboardRoutes = [

  {
    path: "/homepage",
    name: "Home Page",
    icon: "nc-icon nc-globe-2",
    component: Notifications,
    layout: "/admin"
  },

  {
    path: "/comparative-analysis",
    name: "Comparative Analysis",
    icon: "nc-icon nc-preferences-circle-rotate",
    component: TableList,
    layout: "/admin"
  },

  {
    path: "/visualizations",
    name: "Visualizations",
    icon: "nc-icon nc-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },

  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-paper-2",
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin"
  // },
  {
    path: "/VisTest",
    name: "Visualizations Testing",
    icon: "nc-icon nc-pin-3",
    component: VisTest,
    layout: "/admin"
  },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
