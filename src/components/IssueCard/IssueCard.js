import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {issueService} from "../../_services/issue.service";

const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

class SimpleCard extends Component {
    //const { classes } = props;
    //const bull = <span className={classes.bullet}>•</span>;
    constructor(props){
        super(props);
        this.state = {
            id: "",
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
            _links:""
        }
    };

    componentDidMount(){
        this.GetData();
    }

    GetData(){
        issueService.getByID(this.props.id)
            .then(data => {

                this.setState({
                    id: data.id,
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

    vote(id) {
        console.log('Vote ID is:', id);
        issueService.vote(id);
    }

    unvote(id) {
        console.log('Unvote ID is:', id);
        issueService.unvote(id);
    }

    watch(id) {
        console.log('Watch ID is:', id);
        issueService.watch(id);
    }

    unwatch(id) {
        console.log('Unwatch ID is:', id);
        issueService.unwatch(id);
    }


    render()
    {
        let button_v;

        if (true) {
            button_v = <Button onClick={this.vote(this.state.id)} size="small"> Vote this issue </Button>;
        } else {
            button_v = <Button onClick={this.unvote(this.state.id)} size="small"> Unvote this issue </Button>;
        }

        let button_w;

        if (true) {
            button_w = <Button onClick={this.watch(this.state.id)} size="small"> Watch this issue</Button>;
        } else {
            button_w = <Button onClick={this.unwatch(this.state.id)} size="small">Unwatch this issue</Button>;
        }


        return (
            <Card >
                <CardContent>
                    <Typography align={"left"} component="p">
                        <b> Assignee: </b> {this.state.assignee_id}
                        <br/>
                        <b> Type: </b> {this.state.type_issue}
                        <br/>
                        <b> Priority: </b> {this.state.priority}
                        <br/>
                        <b> Status: </b> {this.state.status}
                        <br/>
                        <b> Votes: </b> {this.state.votes} {button_v}
                        <br/>
                        <b>  Watchers: </b> {this.state.watches} {button_w}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);