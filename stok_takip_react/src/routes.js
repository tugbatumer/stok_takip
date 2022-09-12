import React from "react";
import {Route, BrowserRouter as Router,} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books"
import Writers from "./pages/Writers";


const BaseRouter = () => (
    <Router>
        <Route path = "/" exact component = {Dashboard} />
        <Route path = "/books" component = {Books} />
        <Route path = "/writers" component = {Writers} />
    </Router>
);

export default BaseRouter;