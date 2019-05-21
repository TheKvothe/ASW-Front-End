import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import {issueService} from '../../_services/issue.service';

const WelcStyle = {
    fontSize: '30px',
    textAlign: 'center',
    marginTop: '15px',
};


class Issues extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: [],
        };
    }

    componentDidMount(){
        this.GetData();
    }

    GetData(){
        issueService.getAll()
            .then(data => {
                this.setState({issues: data});
            });
    }

    render() {
        return(
            <Grid container justify={"center"} spacing={40}>
                <Grid item xs={12}>
                    <p style={WelcStyle} align="center"><b>Issue tracker ASW!</b></p>
                </Grid>
                <Grid item xs={4}>
                    {
                        this.state.issues.map((issue, key) =>
                            <p>{issue.id}</p>
                        )
                    }
                </Grid>
            </Grid>
        );
    }
}

export default Issues;