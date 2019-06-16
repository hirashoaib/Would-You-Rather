import React from 'react';
import './App.css';
import { Route, Router, Switch } from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory'
import Login from './Login';


function App() {
    return (
        <Router history={createBrowserHistory()}>
            <div>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/login" component={Login} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
