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
import HomePage from "views/HomePage";
import CustomVisualizations from "views/CustomVisualizations";
import BillDetails from "views/BillDetails";
import ComparativeAnalysis from "views/ComparativeAnalysis";
import Homepage from "views/HomePage";


const dashboardRoutes = [

  {
    path: "/homepage",
    name: "Home Page",
    icon: "nc-icon nc-globe-2",
    component: Homepage,
  },

  {
    path: "/comparative-analysis",
    name: "Comparative Analysis",
    icon: "nc-icon nc-preferences-circle-rotate",
    component: ComparativeAnalysis,
  },


  {
    path: "/bill_details",
    name: "Bill Details",
    icon: "nc-icon nc-vector",
    component: BillDetails,
  },

  {
    path: "/visualizations",
    name: "Visualizations",
    icon: "nc-icon nc-chart-pie-36",
    component: CustomVisualizations,
  },

];

export default dashboardRoutes;
