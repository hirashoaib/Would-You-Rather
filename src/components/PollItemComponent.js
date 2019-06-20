import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom'
import { formatQuestion } from "../utils/helper";
import { connect } from "react-redux";
import './PollItemComponent.css';

class PollItemComponent extends Component {
    
  render() {
    return (
        <div className="poll-container">
            <Paper className="poll-paper">
                <div className="poll-header">
                    {this.props.question.authorName} asks:
                </div>
                <div className="poll-components">
                    <Grid container spacing={16}>
                        <Grid item xs={4} alignItems="center" justify="center" container>
                            <div>
                                <img className="poll-image" alt="complex" src={this.props.question.avatar} />
                            </div>
                        </Grid>
                        <Grid item xs={8} container direction="column">
                            <Grid item >
                                <div className="poll-question">
                                    Would you Rather....
                                </div>
                            </Grid>
                            <Grid item>
                                <div>
                                    ..{this.props.question.optionOne.text}...
                                </div>
                            </Grid>
                            <Grid item >
                                <Button variant="contained" color="inherit" className="pollBtn" component={Link} to={this.props.questionURL}>View Poll</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Paper>
        </div>
    );
  }
}


function mapStateToProps({authedUser, questions, users}, { id }) {
    const question = questions[id];

    return {
        authedUser,
        question: formatQuestion(question,users[question.author],authedUser),
        questionURL: users[authedUser].answers[id]? `questionresult/${question.id}` : `/question/${question.id}`
    }
}

export default connect(mapStateToProps)(PollItemComponent);
