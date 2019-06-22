import React, { Component, Fragment } from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import { withStyles } from '@material-ui/core/styles';
import LoadingBar from "react-redux-loading";
import './NavigationBar.css';
import { connect } from "react-redux";
import { setAuthorizedUser } from "../actions/authedUser";
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';

const styles = {
    paper: {
        backgroundColor: "black",
        width:"220px"
    },
    listItem: {
        color:"while",
    },
    toolbar : {
        height: "63px"
    }
  }

class MyDrawer extends Component {
    handleClick = (route)=>{
        return ()=>this.props.history.push(route);
    }

    onLogoutPress = e => {
        e.preventDefault();
        this.props.dispatch(setAuthorizedUser(null));
    }
    render (){
        const { classes, authenticateUser} = this.props;
        console.log("auth user > ",this.props.authedUser);
        console.log("user authenticateUser > ",this.props.authenticateUser);
        return (
            <div className="root">
            {this.props.authedUserId?
            <div>
                <AppBar position="fixed" className="appBar">
                    <Toolbar style={{backgroundColor:"#595959", flexDirection:"row-reverse"}}>
                    
                    <Fragment >
                                    <Typography variant="h5" style={{color:"white"}} >
                                        {authenticateUser.name}
                                    </Typography>
                                    <Avatar alt="Remy Sharp" src={authenticateUser?authenticateUser.avatarURL:""}  style={{marginRight:"20px"}} />
                                </Fragment>
                    </Toolbar>
                </AppBar>
                <LoadingBar />
                <Drawer
                    variant="permanent"
                    classes={{ paper: classes.paper }}
                    anchor="left"
                    style={{backgroundColor:"red"}}
                >
                    <div className={classes.toolbar} />
                    <Divider  style={{backgroundColor:"#A6A6A6"}} />
                    <List>
                                <ListItem className={classes.listItem}  onClick={this.handleClick("/home")}  button key={"home"}>
                                    <ListItemIcon ><HomeIcon style={{backgroundColor:"#A6A6A6"}}/></ListItemIcon>
                                    <ListItemText primary={<Typography variant="body1" style={{ color: '#A6A6A6', fontWeight:"bold" }}>{"Home"}</Typography>} />
                                </ListItem>
                                <ListItem className={classes.listItem} onClick={this.handleClick("/addquestion")}  button key={"newquestion"}>
                                    <ListItemIcon><Icon style={{backgroundColor:"#A6A6A6"}}>add_circle</Icon></ListItemIcon>
                                    <ListItemText primary={<Typography variant="body1" style={{ color: '#A6A6A6', fontWeight:"bold" }}>{"New Question"}</Typography>} />
                                </ListItem>
                                <ListItem className={classes.listItem} onClick={this.handleClick("/leaderboard")}  button key={"leaderboard"}>
                                    <ListItemIcon><Icon style={{backgroundColor:"#A6A6A6"}}>assessment</Icon></ListItemIcon>
                                    <ListItemText primary={<Typography variant="body1" style={{ color: '#A6A6A6', fontWeight:"bold" }}>{"Leader Board"}</Typography>} />
                                </ListItem>
                                <ListItem className={classes.listItem} onClick={this.onLogoutPress}  button key={"logout"}>
                                    <ListItemIcon><Icon style={{backgroundColor:"#A6A6A6"}}>input</Icon></ListItemIcon>
                                    <ListItemText primary={<Typography variant="body1" style={{ color: '#A6A6A6', fontWeight:"bold" }}>{"Logout"}</Typography>} />
                                </ListItem>
                        </List>

                </Drawer>
                </div>:
                <div></div>}
            </div>
        );
    }    
}

function mapStateToProps({authedUser, users}) {
    return {
        authedUserId: authedUser,
        authenticateUser: users[authedUser]
    }
}
export default connect(mapStateToProps)(withStyles(styles)(MyDrawer));