import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import {issueService} from '../../_services/issue.service';
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FilledInput from "@material-ui/core/FilledInput";
import MenuItem from "@material-ui/core/MenuItem";
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";


class IssueEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            title: '',
            description: '',
            assignee: '',
            type: '',
            priority: '',
            issue: null
        };
    }

    componentDidMount(){
        this.GetData();
    }

    GetData(){
        issueService.getByID(this.state.id)
            .then(data => {
                this.setState({issue: data});
            });
    }

    handleChange = name => event => {
        var auxIssue = this.state.issue;
        auxIssue[name] = event.target.value;
        this.setState({ issue: auxIssue });
    };

    render() {
        if (this.state.issue != null) {
            return(
                <Grid container spacing={40} justify="flex-start" alignItems="flex-start">
                    <Grid item xs={12}>
                        <TextField
                            id="issue-title"
                            label="Title"
                            value={this.state.issue.title}
                            onChange={this.handleChange('title')}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Description"
                            multiline
                            rowsMax="4"
                            value={this.state.issue.description}
                            onChange={this.handleChange('description')}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="filled">
                            <InputLabel htmlFor="filled-type-simple">Type</InputLabel>
                            <Select
                                value={this.state.issue.type_issue}
                                onChange={this.handleChange('type_issue')}
                                input={<FilledInput name="type" id="filled-type-simple" />}
                            >
                                <MenuItem value={'bug'}>Bug</MenuItem>
                                <MenuItem value={'task'}>Task</MenuItem>
                                <MenuItem value={'proposal'}>Proposal</MenuItem>
                                <MenuItem value={'enhancement'}>Enhancement</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="filled">
                            <InputLabel htmlFor="filled-priority-simple">Priority</InputLabel>
                            <Select
                                value={this.state.issue.priority}
                                onChange={this.handleChange('priority')}
                                input={<FilledInput name="priority" id="filled-priority-simple" />}
                            >
                                <MenuItem value={'blocker'}>Bug</MenuItem>
                                <MenuItem value={'critical'}>Task</MenuItem>
                                <MenuItem value={'major'}>Proposal</MenuItem>
                                <MenuItem value={'minor'}>Enhancement</MenuItem>
                                <MenuItem value={'trivial'}>Enhancement</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Link to={'/issues/' + this.state.id}><Button variant="contained" color="secondary">Back</Button></Link>
                        <Button variant="contained" color="primary">Update Issue</Button>
                    </Grid>
                </Grid>
            );
        }
        else{
            return(
                <div>
                </div>
            );
        }

    }
}

export default IssueEdit;