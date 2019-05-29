import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {issueService} from "../../_services/issue.service";
import {userService} from "../../_services/user.service";
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

const img = {
    width: '18px',
    height: '18px',
    marginLeft: '10px',
    borderRadius: '50%',
};

class IssueCard extends Component {
    //const { classes } = props;
    //const bull = <span className={classes.bullet}>•</span>;
    constructor(props){
        super(props);
        this.state = {
            /*id: "",
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
            _links:"",*/

            assignee_name: " - ",
            assignee_avatar: null,
            username: localStorage.getItem('name'),

        }
    };

    componentDidMount(){
        this.GetData();
    }

    GetData(){
        issueService.getByID(this.props.id)
            .then(data => {

                var voted = false;
                var watched = false;
                var it=0;
                console.log(this.state.username);
                console.log(data.voters);
                console.log(data.watchers);
                //Comprobar si el usuario ha votado/watcheado la issue  (comprobación hardcodeada con id=10)
                for (it = 0; it < data.voters.length; ++it){
                    if (data.voters[it][0][1] == this.state.username) voted=true;
                }
                for (it = 0; it < data.watchers.length; ++it){
                    if (data.watchers[it][1] == this.state.username) watched=true;
                }

                var votes = 0;
                if (data.votes != null) {
                    votes=data.votes;
                }

                this.setState({
                    id: data.id,
                    title: data.title,
                    description: data.description,
                    type_issue: data.type_issue,
                    priority: data.priority,
                    status: data.status,
                    votes: votes,
                    watches: data.watches,
                    creator_id: data.creator_id,
                    assignee_id: data.assignee_id,
                    created_at: data.creator_id,
                    updated_at: data.updated_at,
                    voters: data.voters,
                    watchers: data.watchers,
                    _links: data._links,

                    voted,
                    watched,
                });

                userService.getByID(data.assignee_id)
                    .then ( data => {
                        this.setState({
                            assignee_name: data.name,
                            assignee_avatar: data.foto
                        });
                    });

            });
    }

    vote(id) {
        //console.log('Vote ID is:', id);
        issueService.vote(id);
        var votes = this.state.votes+ 1;
        var voted = !this.state.voted;
        this.setState({votes, voted})
    }

    unvote(id) {
        //console.log('Unvote ID is:', id);
        issueService.unvote(id);
        var votes = this.state.votes - 1;
        var voted = !this.state.voted;
        this.setState({votes, voted})
    }

    watch(id) {
        //console.log('Watch ID is:', id);
        issueService.watch(id);
        var watches = this.state.watches + 1;
        var watched = !this.state.watched;
        this.setState({watches, watched})
    }

    unwatch(id) {
        //console.log('Unwatch ID is:', id);
        issueService.unwatch(id);
        var watches = this.state.watches - 1;
        var watched = !this.state.watched;
        this.setState({watches, watched})
    }


    render()
    {
        let button_v;
        if (!this.state.voted) {
            button_v = <Button onClick={ () => this.vote(this.state.id)} size="small"> Vote this issue </Button>;
        } else {
            button_v = <Button onClick={ () => this.unvote(this.state.id)} size="small"> Unvote this issue </Button>;
        }

        let button_w;

        if (!this.state.watched) {
            button_w = <Button onClick={ () => this.watch(this.state.id)} size="small"> Watch this issue</Button>;
        } else {
            button_w = <Button onClick={ () => this.unwatch(this.state.id)} size="small">Unwatch this issue</Button>;
        }


        return (
            <Card >
                <CardContent>
                    <Typography align={"left"} component="p">
                        <b> Assignee: </b> <img style={img} src={this.state.assignee_avatar} alt=" " /> {this.state.assignee_name}
                        <br/>
                        <b> Type: </b> {this.state.type_issue}
                        <br/>
                        <b> Priority: </b> {this.state.priority}
                        <br/>
                        <b> Status: </b> {this.props.status}
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

IssueCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IssueCard);