import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import './NotFound404Component.css'

class NotFound404Component extends Component {
  render() {
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
    );
  }
}

export default NotFound404Component;
