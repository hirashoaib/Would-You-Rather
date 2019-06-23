import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { formatQuestion } from "../utils/helper";
import { connect } from "react-redux";
import { handleSaveAnswer } from "../actions/questions";
import { Redirect } from "react-router-dom";
import './ViewQuestionComponent.css';
import { saveURL } from "../actions/url";
import { Link } from "react-router-dom";

class ViewQuestionComponent extends Component {

    state = {
        selectedOption: '',
        goToResultComponent: false,
    };

    selectOption = event => {
        this.setState({ selectedOption: event.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { selectedOption } = this.state;
        this.props.dispatch(handleSaveAnswer(this.props.qid, selectedOption));
        this.setState({
            selectedOption:'',
            goToResultComponent: true,
        })
    }

    notfoundComponent(){
        return (
            <div>
                <div className="notfound-container">
                    <Paper style={{padding:"20px"}}>
                        <div>
                            <div className="notfound-sorry-text">
                                    Oppsss Sorry!
                            </div>
                            <div className="notfound-message">
                                The resource you are looking for does not exists
                            </div>
                        </div>
                        <Button variant="contained" color="inherit" className="notfound-btn" component={Link} to={"/home"}>GoTo Home Page</Button>
                    </Paper>
                </div>
            </div>
        )
    }

    render() {
        const { question, authedUser} = this.props;
        if(!authedUser){
            this.props.dispatch(saveURL(this.props.match));
            return <Redirect to="/login" />
        }
        if(!question) {
            return this.notfoundComponent();
        }
        if(this.state.goToResultComponent){
            return <Redirect to={`/question-result/${question.id}`} />
        }
        return (
            <div className="question-container">
                <Paper style={{overflow: "auto"}}>
                    <div className="ques-title">
                        {question.authorName} asks:
                    </div>
                    <div className="add-question-component">
                        <Grid container spacing={16}>
                        
                            <Grid item xs={4} alignItems="center" justify="center" container>
                                <div>
                                    <img className="view-question-img" alt="complex" src={question.avatar} />
                                </div>
                            </Grid>
                            <Grid item xs={1}>
                                <div className="separator">
                                </div>
                            </Grid>
                            <Grid item xs={7} container direction="column">
                                <Grid item>
                                    <div className="question-header-text">
                                        Would you Rather....
                                    </div>
                                </Grid>
                                <Grid item >
                                    <div>
                                    <RadioGroup
                                        aria-label="Gender"
                                        name="gender1"
                                        value={this.state.value}
                                        onChange={this.selectOption}
                                    >
                                        <FormControlLabel value="optionOne" control={<Radio style={{color:"#F2B705"}} />} label={question.optionOne.text} />
                                        <FormControlLabel value="optionTwo" control={<Radio style={{color:"#F2B705"}}/>} label={question.optionTwo.text} />
                                    </RadioGroup>
                                    </div>
                                </Grid>
                                <Grid item >
                                    <Button variant="contained" 
                                            style={{width: "100%", backgroundColor:"#F2B705"}}
                                            onClick={this.handleSubmit}
                                            disabled={this.state.value===''}
                                            >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>                    
                </Paper>
            </div>
        );
    }
}

function mapStateToProps({authedUser, questions, users}, props) {
    const { id } = props.match.params;
    return {
        authedUser,
        qid: id,
        question: questions[id]? formatQuestion(questions[id],users[questions[id].author],authedUser): null
    }
}

export default connect(mapStateToProps)(ViewQuestionComponent);
