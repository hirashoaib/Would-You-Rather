import React, { Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Route, Router, Switch } from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory'
import Login from './Login';
import TestPage from './TestPage';
import Button from '@material-ui/core/Button';
import './NavigationBar4.css';

class MyDrawer extends Component {
    render (){
        return (
            <div className="root">
                <AppBar position="fixed" className="appBar">
                    <Toolbar>
                    <Typography variant="h6" noWrap>
                        Permanent drawer
                    </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className="drawer"
                    variant="permanent"
                    classes={{
                    paper: "drawerPaper"
                    }}
                    anchor="left"
                >
                    <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem  button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                        </ListItem>
                    ))}
                    </List>
                </Drawer>
            </div>
        );
    }    
}
export default MyDrawer;
