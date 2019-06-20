import React, { Component } from 'react';
import './App.css';
import { Route, Router, Switch } from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory'
import Login from './Login';
import MiniDrawer from './NavigationBar';
import TestPage from './TestPage';



import { makeStyles, ThemeProvider } from '@material-ui/styles';
import { spacing } from '@material-ui/system';
import { createMuiTheme } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import PermanentDrawerLeft from './NavigationBar3';
import MyDrawer from './NavigationBar4';


const theme = createMuiTheme({
    spacing: value => value,
    status: {
      // My business variables
      danger: orange[500],
    },
  });
  

class App extends Component {
    render (){
        return (
            <Router history={createBrowserHistory()}>
                <ThemeProvider theme={theme}>
                        <div>
                            {/*<MiniDrawer />*/}
                            {/*<TemporaryDrawer />*/}
                            <MyDrawer />
                        </div>
                        <Switch>
                            <Route exact path="/" component={Login} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/testpage" component={TestPage} />
                        </Switch>
                    </ThemeProvider>   
                
            </Router>
                     
        );
    }
    
}

export default App;
