import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FilledInput from '@material-ui/core/FilledInput';
import { connect } from "react-redux";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Redirect } from "react-router-dom";
import { setAuthorizedUser } from "../actions/authedUser";

import './LoginComponent.css';
import { Typography } from '@material-ui/core';

class LoginComponent extends Component {

    state = {
        userId: '',
        toHome: false,
    };

    handleUserChange = event => {
        this.setState({ userId: event.target.value });
    };

    login(e) {
        e.preventDefault();
        const { userId } = this.state;
        this.props.dispatch(setAuthorizedUser(userId));
        // add in store 
        this.setState({
            userId:'',
            toHome: true
        });
    }

    render() {
        const {userIds, users} = this.props;

        if(this.state.toHome){
            return <Redirect to="/home" />
        }

        return (
            <div className="main-login-container">
                <Paper style={{height:"300px", backgroundColor:"#161616"}}>
                    <div className="login-title-header">
                        <div className="login-title">
                            Welcome to the Would you Rather App!
                        </div>
                        <div>
                            Please sign in to continue
                        </div>
                    </div>
                    <div className="login-components">
                        <form>
                            <FormControl variant="filled" className="form-elements">
                                <InputLabel htmlFor="login-users" style={{color:"white"}}>Select User</InputLabel>
                                <Select
                                    style={{backgroundColor:"#3b3b3b"}}
                                    value={this.state.userId}
                                    onChange={this.handleUserChange}
                                    input={<FilledInput name="userId" id="login-users" />}
                                >   
                                    {
                                        userIds.map((id) => (
                                            <MenuItem style={{backgroundColor:"#262626"}} key={id} value={id}>
                                                <ListItemIcon >
                                                    <img className="login-image" alt="complex" src={users[id].avatarURL} />
                                                </ListItemIcon>
                                                <ListItemText inset primary={<Typography type="body2" style={{ color: 'white' }}>{users[id].name}</Typography>} />
                                                
                                            </MenuItem>        
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </form>
                    </div>
                    <Button variant="contained" color="inherit" className="form-elements" onClick={this.login.bind(this)}>Login</Button>
                </Paper>
            </div>

        );
    }
}

function mapStateToProps({authedUser, users}) {
    return {
        authedUser,
        userIds: Object.keys(users),
        users: users
    }
}

export default connect(mapStateToProps)(LoginComponent);
