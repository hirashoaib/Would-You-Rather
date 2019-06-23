import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Badge from '@material-ui/core/Badge';
import './LeaderboardComponent.css';
import { withStyles } from '@material-ui/core/styles';
import { saveURL } from "../actions/url";

const styles = {
    badge: {
        backgroundColor: "#F2B705",
        marginTop: "25px",
        color:"white"
    }
  }

class LeaderboardComponent extends Component {

    render() {
        if(!this.props.authedUser){
            this.props.dispatch(saveURL(this.props.match));
            return <Redirect to="/login" />
        }
        return (
            <div className="leader-container">
                <Grid container spacing={24} direction="column">
                    {
                        this.props.userIds.map((id) => {
                            let user = this.props.users[id];
                            return (<Grid key={id} item xs={12}>
                                    <div>
                                        <Paper className="leader-paper">
                                            <Grid container spacing={16}>
                                                <Grid item xs={3} alignItems="center" justify="center" container>
                                                    <div>
                                                        <img className="leader-img" alt="complex" src={user.avatarURL} />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={1} >
                                                    <div className="leader-separator">
                                                    </div>
                                                </Grid>
                                                <Grid item xs={7} sm container>
                                                    <Grid item xs container direction="column" spacing={16}>
                                                        <Grid item xs >
                                                            <div style={{fontWeight: "bold"}}>
                                                                {user.name}
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs container>
                                                            <Grid xs={10} item >
                                                                Answered questions
                                                            </Grid>
                                                            <Grid xs={2} item>
                                                                {Object.keys(user.answers).length}
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs container>
                                                            <Grid item xs={10}>
                                                                Created questions
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                {user.questions.length}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={1} >
                                                    <div className="leader-separator">
                                                    </div>
                                                </Grid>
                                                <Grid xs={2} item container direction="column" alignItems="center" justify="center">
                                                        <Paper className="leader-score-box">
                                                            <Grid item container direction="column" >
                                                                <Grid item className="leader-score">
                                                                    Score
                                                                </Grid>
                                                                <Grid item alignItems="center" justify="center" container>
                                                                <Badge classes={{ badge: this.props.classes.badge}}
                                                                        badgeContent={user.questions.length + Object.keys(user.answers).length} >
                                                                    <span></span>
                                                                </Badge>
                                                                </Grid>
                                                            </Grid>
                                                        </Paper>
                                                    </Grid>
                                            </Grid>
                                        </Paper>
                                    </div>
                                </Grid>
                                )
                            }
                        )
                    }
                </Grid>
            </div>
        );
  }
}

function countQuestionAndAnswer(user){
    return user.questions.length + Object.keys(user.answers).length;
}

function mapStateToProps({authedUser, users}) {
    return {
        authedUser,
        users,
        userIds: Object.keys(users)
            .sort((a,b) => countQuestionAndAnswer(users[b]) - countQuestionAndAnswer(users[a]))
    }
}

export default connect(mapStateToProps)(withStyles(styles)(LeaderboardComponent));