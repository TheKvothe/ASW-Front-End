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

        }
    };
    render()
    {
        return (
            <Card >
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="h2">

                    </Typography>
                    <Typography  color="textSecondary">
                        adjective
                    </Typography>
                    <Typography component="p">
                         Assignee: {this.props.issue.assignee_id}
                        <br/>
                        Type: {this.props.issue.type_issue}
                        <br/>
                        Priority: {this.props.issue.priority}
                        <br/>
                        Status: {this.props.issue.status}
                        <br/>
                        Votes: {this.props.issue.votes}
                        <br/>
                        Watchers: {this.props.issue.watches}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        );
    }
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);