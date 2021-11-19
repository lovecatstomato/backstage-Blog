import React from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import App from "../App";
import About from "../ordinary/About";

const BasicRoute = () => {
    return (
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/about" component={About} />
        </Switch>
    )
}

export default BasicRoute;