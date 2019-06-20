import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
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
import { withStyles } from '@material-ui/core/styles';
import LoadingBar from "react-redux-loading";
import './NavigationBar.css';
import { connect } from "react-redux";

const styles = {
    paper: {
        //backgroundColor: "#04102A",
        backgroundColor: "white",
        width:"220px"
    },
    listItem: {
        color:"while",
    },
    toolbar : {
        height: "64px"
    }
  }

class MyDrawer extends Component {
    handleClick = (route)=>{
        return ()=>this.props.history.push(route);
    }
    render (){
        const { classes} = this.props;
        console.log("auth user > ",this.props.authedUser);
        console.log("user loggedInUser > ",this.props.loggedInUser);
        return (
            <div className="root">
                <AppBar position="fixed" className="appBar">
                    <Toolbar>
                    <Typography variant="h6" noWrap>
                        Permanent
                    </Typography>
                    </Toolbar>
                </AppBar>
                <LoadingBar />
                <Drawer
                    variant="permanent"
                    classes={{ paper: classes.paper }}
                    anchor="left"
                >
                    <div className={classes.toolbar} />
                    <Divider />

                    {this.props.authedUserId? <List>
                                <ListItem className={classes.listItem} onClick={this.handleClick("/home")}  button key={"home"}>
                                    <ListItemIcon><InboxIcon /></ListItemIcon>
                                    <ListItemText primary={"Home"} />
                                </ListItem>
                                <ListItem className={classes.listItem} onClick={this.handleClick("/newquestion")}  button key={"newquestion"}>
                                    <ListItemIcon><InboxIcon /></ListItemIcon>
                                    <ListItemText primary={"New Question"} />
                                </ListItem>
                                <ListItem className={classes.listItem} onClick={this.handleClick("/leaderboard")}  button key={"leaderboard"}>
                                    <ListItemIcon><InboxIcon /></ListItemIcon>
                                    <ListItemText primary={"Leader Board"} />
                                </ListItem>
                                <ListItem className={classes.listItem} onClick={this.handleClick("/testpage")}  button key={"testpage"}>
                                    <ListItemIcon><InboxIcon /></ListItemIcon>
                                    <ListItemText primary={"Test Page"} />
                                </ListItem>
                                <ListItem className={classes.listItem} onClick={this.handleClick("/logout")}  button key={"logout"}>
                                    <ListItemIcon><InboxIcon /></ListItemIcon>
                                    <ListItemText primary={"Logout"} />
                                </ListItem>
                        </List>:
                        <List>
                            <ListItem className={classes.listItem} onClick={this.handleClick("/login")}  button key={"login"}>
                                    <ListItemIcon><InboxIcon /></ListItemIcon>
                                    <ListItemText primary={"Login"} />
                                </ListItem>
                        </List>
                    }

                </Drawer>
            </div>
        );
    }    
}

function mapStateToProps({authedUser, users}) {
    return {
        authedUserId: authedUser,
        loggedInUser: users[authedUser]
    }
}
export default connect(mapStateToProps)(withStyles(styles)(MyDrawer));