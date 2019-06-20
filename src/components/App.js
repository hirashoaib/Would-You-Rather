import React, { Component } from 'react';
import './App.css';
import { Route, Router, Switch } from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory'
import LoginComponent from './LoginComponent';
import TestPage from './TestPage';
import MyDrawer from './NavigationBar';
import { handleIntialData  } from "../actions/shared";
import { connect } from "react-redux";

class App extends Component {

    componentDidMount(){
        this.props.initilizeData();
    }

    render (){
        let history = createBrowserHistory();
        return (
            <Router history={history}>
                <div>
                    <div>
                        <MyDrawer history={history} />
                    </div>
                    <div className="appcontent" >
                        <Switch>
                            <Route exact path="/" component={LoginComponent} />
                            <Route exact path="/login" component={LoginComponent} />
                            <Route exact path="/testpage" component={TestPage} />
                        </Switch>
                    </div>
                </div>
            </Router>
                     
        );
    }
    
}

function mapDispatchToProps(dispatch) {
    return {
        initilizeData: () => {
            dispatch(handleIntialData());
        }
    };
}

export default connect(null, mapDispatchToProps)(App);
