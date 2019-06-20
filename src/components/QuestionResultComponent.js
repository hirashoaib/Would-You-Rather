import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import { Redirect } from "react-router-dom";
import { formatQuestion, voteCount } from "../utils/helper";
import { connect } from "react-redux";

import './QuestionResultComponent.css';

class QuestionResultComponent extends Component {

    totlaVotes () {
        return this.props.question.optionOne.votes.length + this.props.question.optionTwo.votes.length
    }

    render() {

    const { question, authedUser} = this.props;
    let questionText = "Would you rather";
        
    if(!authedUser){
        return <Redirect to="/login" />
    }
    if(!question) {
        return null;
    }

    return (
        <div className="result-container">
            <Paper style={{overflow: "auto"}}>
                <div className="result-title">
                    {question.authorName} asks:
                </div>
                <div className="result-components">
                    <Grid container spacing={16}>
                    
                        <Grid item xs={3} alignItems="center" justify="center" container>
                            <div>
                                <img className="result-image" alt="complex" src={question.avatar} />
                            </div>
                        </Grid>
                        <Grid item xs={1}>
                            <div className="result-separator">
                            </div>
                        </Grid>
                        <Grid item xs={8} container direction="column">
                            <Grid item >
                                <div className="result-text">
                                    Results:
                                </div>
                            </Grid>
                            <Grid item style={{marginTop:"50px"}}>
                                <Paper style={{padding: "18px"}}>
                                    {   
                                        this.userVoteDiv(question.optionOne)
                                    }
                                    <Grid container spacing={16} direction="column">
                                        <Grid item >
                                            {questionText} {question.optionOne.text}
                                        </Grid>
                                        <Grid item >
                                            {this.progressBar(question.optionOne)}
                                        </Grid>
                                        <Grid item style={{textAlign: "center", fontWeight: "bold"}} >
                                            {question.optionOne.votes.length} out of { this.totlaVotes() } votes
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item style={{marginTop:"50px"}}>
                                <Paper style={{padding: "18px"}}>
                                    {   
                                        this.userVoteDiv(question.optionTwo)
                                    }
                                    <Grid container spacing={16} direction="column">
                                        <Grid item >
                                            {questionText} {question.optionTwo.text}
                                        </Grid>
                                        <Grid item >
                                            {this.progressBar(question.optionTwo)}
                                        </Grid>
                                        <Grid item style={{textAlign: "center", fontWeight: "bold"}}>
                                            {question.optionTwo.votes.length} out of { this.totlaVotes()} votes
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            
                        </Grid>
                    </Grid>
                </div>
            </Paper>
        </div>
    );
  }

    userVoteDiv(optionObj){
        if(optionObj.votes.includes(this.props.authedUser)){
            return (
                <div className="vote-div">
                    Your Vote
                </div>
            )
        }
        return null;
    }

    progressBar(optionObj){
        return (<LinearProgress variant="determinate" value={voteCount(optionObj.votes.length,this.props.question)} style={{height: "15px !important"}}/>)
    }
}

function mapStateToProps({authedUser, questions, users}, props) {
    const { id } = props.match.params;
    return {
        authedUser,
        question: questions[id]? formatQuestion(questions[id],users[questions[id].author],authedUser): null
    }
}

export default connect(mapStateToProps)(QuestionResultComponent);

