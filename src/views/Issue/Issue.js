import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import {issueService} from '../../_services/issue.service';
import SimpleCard from '../../components/IssueCard/IssueCard';
import SimpleSelect from '../../components/IssueStatusSelector/IssueStatusSelector';

const WelcStyle = {
    fontSize: '30px',
    textAlign: 'center',
    marginTop: '15px',
};


class Issue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            type_issue: "",
            priority: "",
            status: "",
            votes: "",
            watches: "",
            creator_id: "",
            assignee_id: "",
            created_at: "",
            updated_at: "",
            voters: "",
            watchers: "",
            _links:"",
            id: this.props.match.params.id,
        };
    }

    componentDidMount(){
        this.GetData();
    }

    GetData(){
        issueService.getByID(this.state.id)
            .then(data => {

                this.setState({
                    title: data.title,
                    description: data.description,
                    type_issue: data.type_issue,
                    priority: data.priority,
                    status: data.status,
                    votes: data.votes,
                    watches: data.watches,
                    creator_id: data.creator_id,
                    assignee_id: data.assignee_id,
                    created_at: data.creator_id,
                    updated_at: data.updated_at,
                    voters: data.voters,
                    watchers: data.watchers,
                    _links: data._links
                });

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
                        <SimpleSelect id={this.state.id}/>
                        <SimpleCard issue={this.state}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Issue;