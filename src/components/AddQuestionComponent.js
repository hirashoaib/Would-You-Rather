import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleSaveQuesiton } from "../actions/questions";

import './AddQuestionComponent.css';

class AddQuestionComponent extends Component {

    state = {
        optionOne:'',
        optionTwo:'',
        goToHome: false,
    };

    addOption = name => event => {
        this.setState({ [name]: event.target.value });
    };

    addQuestion = e => {
        e.preventDefault();
        const {optionOne , optionTwo} = this.state;
        this.props.dispatch(handleSaveQuesiton(optionOne, optionTwo));
        this.setState({
            optionOne:'',
            optionTwo:'',
            goToHome: true
        });
    }

    render() {

        if(!this.props.authedUser){
            return <Redirect to="/login" />
        }
        
        if(this.state.goToHome){
            return <Redirect to="/home" />
        }

        return (
            <div>
                <div className="add-question-container">
                    <Paper style={{overflow: "auto",padding: "20px"}}>
                        <div className="add-question-title">
                            Create New Quesiton
                        </div>
                        <div style={{marginTop: "30px", display: "flex", flexDirection: "column"}}>
                            <div >
                                Complete the quesiton:
                            </div>
                            <div className="question-title">
                                Would you rather...
                            </div>
                            <form>
                                <TextField
                                    id="outlined-name"
                                    label="Option One"
                                    className="new-input-width"
                                    value={this.state.optionOne}
                                    onChange={this.addOption('optionOne')}
                                    margin="normal"
                                    variant="outlined"
                                    />
                                <div style={{textAlign: "center"}}>
                                    OR
                                </div>
                                <TextField
                                    id="outlined-name"
                                    label="Option Two"
                                    className="new-input-width"
                                    value={this.state.optionTwo}
                                    onChange={this.addOption('optionTwo')}
                                    margin="normal"
                                    variant="outlined"
                                    />
                            </form>
                        </div>
                        <Button variant="contained" color="inherit" className="add-question-btn" onClick={this.addQuestion}>Submit</Button>
                    </Paper>
                </div>
            </div>
        );
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(AddQuestionComponent);
