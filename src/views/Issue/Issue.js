import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import {issueService} from '../../_services/issue.service';
import IssueCard from '../../components/IssueCard/IssueCard';
import {userService} from "../../_services/user.service";
import SimpleSelect from '../../components/IssueStatusSelector/IssueStatusSelector';
import Button from '@material-ui/core/Button';
//import Link from "react-router-dom";
import Link from "react-router-dom/es/Link";
const TitleStyle = {
    fontSize: '30px',
    textAlign: 'center',
    marginTop: '15px',
    marginLeft: '15px',
};

const IssueStyle = {
    fontSize: '15px',
    textAlign: 'left',
    marginTop: '0px',
    marginLeft: '15px',
};

const IssueDescStyle = {
    fontSize: '15px',
    textAlign: 'left',
    marginTop: '0px',
    marginLeft: '100px',
};

const Line = {
    borderBottomColor: 'black',
    borderBottomWidth: '1',
};

const img = {
    marginLeft: '15px',
    borderRadius: '50%',
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

            creator_name: "",
            creator_avatar: "",
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

                userService.getByID(data.creator_id)
                    .then ( data => {
                        this.setState({
                            creator_name: data.name,
                            creator_avatar: data.foto
                        });
                    });

            });

    }

    deleteIssue(id){
        issueService.destroy(id);
        this.props.history.push("/");
    }

    editIssue(id){
        this.props.history.push("/issues/" + this.state.id + "/edit")
    }

    render() {
        let data = this.state.created_at.substring(0, 10);
        return(
            <div>
                <table width="100%">
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <td>
                            <Grid container
                                  direction="row"
                                  justify="flex-start"
                                  alignItems="center">
                                <p style={TitleStyle} align="left"><b>{this.state.title}</b></p>
                            </Grid>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Grid container
                                  direction="row"
                                  justify="flex-start"
                                  alignItems="center">
                                <p style={IssueStyle} size="small" align="left"><b> Issue #{this.state.id}</b></p>
                                <p style={IssueStyle} size="small" align="left"><b>{this.state.status}</b></p>
                            </Grid>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Grid container
                                  direction="row"
                                  justify="flex-start"
                                  alignItems="center">
                                <img style={img} src={this.state.creator_avatar} alt="avatar" />
                                <p style={IssueStyle} size="small" align="left"><b>{this.state.creator_name}</b></p>
                                <p style={IssueStyle} size="small" align="left"><b> created an issue {data} </b></p>
                            </Grid>
                            <Grid container
                                  direction="row"
                                  justify="flex-start"
                                  alignItems="center">
                                <p style={IssueDescStyle} size="small" align="left"><b>{this.state.description}</b></p>
                            </Grid>
                        </td>

                        <td rowSpan="2">
                            <Grid container
                                  direction="column"
                                  justify="flex-end"
                                  alignItems="center" >
                            <SimpleSelect id={this.state.id}/>
                            </Grid>
                            <Grid container
                                  direction="column" //igual es mejor poner row como estaba antes
                                  justify="flex-end"
                                  alignItems="center" >
                                <IssueCard id={this.state.id}/>
                                <br/>
                                <Button variant="contained" onClick={ () => this.deleteIssue(this.state.id)} size="small"> DELETE </Button>
                                <Button variant="contained" onClick={ () => this.editIssue(this.state.id)} size="small"> EDIT </Button>

                            </Grid>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default Issue;