import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Test from './Test';
// import * as serviceWorker from './serviceWorker';
import { HashRouter, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
ReactDOM.render(
    <HashRouter>
        <Switch>
            {/* <Route exact path="/test" component={Test} /> */}
            <Route component={App} />
        </Switch>
    </HashRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
