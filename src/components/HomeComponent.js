import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PollItemComponent from './PollItemComponent';
import { saveURL } from "../actions/url";
  
class HomeComponent extends Component {

    state = {
      tabIndex: 0,
    };

    chagneTabs = (event, value) => {
        this.setState({ tabIndex: value });
    };

    render() {
        console.log("this.props == ",this.props);
        console.log("this.props.match == ",this.props.match);
        console.log("this.props.match.params == ",this.props.match.params);
        const { tabIndex } = this.state;
        const { authedUser} = this.props;

        if(!authedUser){
            this.props.dispatch(saveURL(this.props.match));
            return <Redirect to="/login" />
        }

        return (
            <div style={{minWidth: '320px', maxWidth: '500px', height: 'auto',
                position: 'absolute', top: "20%", left: '0px', right: '0px', margin: 'auto', paddingLeft: '200px'}}>
                <Paper >
                    <Grid container spacing={16} justify="center" >
                        <Grid item xs={12}>
                            <Tabs value={tabIndex} onChange={this.chagneTabs}  variant="fullWidth">
                                <Tab label="Unanswered Questions" />
                                <Tab label="Answered Questions" />
                            </Tabs>    
                        </Grid>
                        <Grid item xs={12}>
                            {tabIndex === 0 && this.pollItems(false)}
                            {tabIndex === 1 && this.pollItems(true)}
                            
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }


    pollItems(isAnswered){
        let questionsIds = isAnswered? this.props.answeredQuestionIds: this.props.unsweredQuestionIds;
        return (
            <div>
                {
                    questionsIds.map((id) => (
                        <PollItemComponent key={id} id={id}></PollItemComponent>
                    ))
                }
            </div>   
        )
    }
}

function mapStateToProps({authedUser,users, questions, saveURL}) {
    return {
        authedUser,
        answeredQuestionIds: Object.keys(questions)
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
            .filter((a)=> {
                return authedUser && users[authedUser].answers[a];
            }),
        unsweredQuestionIds: Object.keys(questions)
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
            .filter((a)=> {
                return authedUser && !users[authedUser].answers[a];
            }) 
    }
}

export default connect(mapStateToProps)(HomeComponent);