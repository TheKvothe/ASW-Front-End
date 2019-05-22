import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import {issueService} from '../../_services/issue.service';
import EnhancedTable from '../../components/IssuesTable/IssuesTable'

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
            <div>
                <Grid container justify={"center"} spacing={40}>
                    <Grid item xs={12}>
                        <p style={WelcStyle} align="center"><b>Issue tracker ASW!</b></p>
                    </Grid>
                    <Grid item xs={12}>
                        <EnhancedTable/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Issues;