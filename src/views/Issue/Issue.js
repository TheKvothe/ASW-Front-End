import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import {issueService} from '../../_services/issue.service';
import IssueCard from '../../components/IssueCard/IssueCard';


const TitleStyle = {
    fontSize: '30px',
    textAlign: 'center',
    marginTop: '15px',
    marginLeft: '15px',
};

const IssueStyle = {
    fontSize: '15px',
    textAlign: 'left',
    marginTop: '5px',
    marginLeft: '15px',
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
                    created_at: data.created_at,
                    updated_at: data.updated_at,
                    voters: data.voters,
                    watchers: data.watchers,
                    _links: data._links
                });

            });
    }

    render() {
        let data = this.state.created_at.substring(0, 10);
        return(
            <div>
                <Grid container
                      direction="row"
                      justify="flex-start"
                      alignItems="center">
                    <p style={TitleStyle} align="left"><b>{this.state.title}</b></p>
                </Grid>
                <Grid container
                      direction="row"
                      justify="flex-start"
                      alignItems="center">
                    <p style={IssueStyle} size="small" align="left"><b> Issue #{this.state.id}</b></p>
                    <p style={IssueStyle} size="small" align="left"><b>{this.state.status}</b></p>
                </Grid>
                <Grid container
                      direction="row"
                      justify="flex-start"
                      alignItems="center">
                    <p style={IssueStyle} size="small" align="left"><b>{this.state.creator_id}</b></p>
                    <p style={IssueStyle} size="small" align="left"><b> created an issue {data} </b></p>
                </Grid>
                <Grid container
                      direction="row"
                      justify="flex-start"
                      alignItems="center">
                    <p style={IssueStyle} size="small" align="left"><b>{this.state.description}</b></p>
                </Grid>
                <Grid container
                      direction="row"
                      justify="flex-end"
                      alignItems="center" >
                    <IssueCard id={this.state.id}/>
                </Grid>
            </div>
        );
    }
}

export default Issue;