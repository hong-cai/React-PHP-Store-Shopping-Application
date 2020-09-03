import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Test from './Test';
// import * as serviceWorker from './serviceWorker';
import { HashRouter, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
ReactDOM.render(
    <Router>
        <Switch>
            {/* This test route is for testing separate components */}
            <Route exact path="/test" component={Test} />
            <Route component={App} />
        </Switch>
    </Router>, document.getElementById('root'));
