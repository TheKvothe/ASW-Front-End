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
import {Link, Redirect} from "react-router-dom";
import UserSelector from "../../components/UserSelector/userSelector";


class IssueCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            title: '',
            description: '',
            type_issue:'',
            priority:'',
            assignee_id: 0,
        };
        this.createIssue = this.createIssue.bind(this);
    }

    componentDidMount(){
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    createIssue(){
        let title = this.state.title;
        let desc = this.state.description;
        let type = this.state.type_issue;
        let priority = this.state.priority;
        let assignee = this.state.assignee_id;

        issueService.post(title,desc,type,priority,assignee)
            .then( () => {
                this.setState({redirect: true})
            });
    }

    render() {
        if (this.state.redirect) return <Redirect to='/' push /> ;
        else{
            return(
                <Grid container spacing={40} justify="flex-start" alignItems="flex-start">
                    <Grid item xs={12}>
                        <TextField
                            id="issue-title"
                            label="Title"
                            value={this.state.title}
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
                            value={this.state.description}
                            onChange={this.handleChange('description')}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <UserSelector
                            id={this.state.id}
                            sendAssignee={ (idAssignee) => this.setState( prevState => ({
                                                            issue: {
                                                                ...prevState.issue,
                                                                assignee_id: idAssignee
                                                            }
                            }))}/>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="filled">
                            <InputLabel htmlFor="filled-type-simple">Type</InputLabel>
                            <Select
                                value={this.state.type_issue}
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
                                value={this.state.priority}
                                onChange={this.handleChange('priority')}
                                input={<FilledInput name="priority" id="filled-priority-simple" />}
                            >
                                <MenuItem value={'blocker'}>Bug</MenuItem>
                                <MenuItem value={'critical'}>Task</MenuItem>
                                <MenuItem value={'major'}>Proposal</MenuItem>
                                <MenuItem value={'minor'}>minor</MenuItem>
                                <MenuItem value={'trivial'}>trivial</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Link to='/'><Button variant="contained" color="secondary">Back</Button></Link>
                        <Button variant="contained" color="primary" onClick={this.createIssue}>Create Issue</Button>
                    </Grid>
                </Grid>
            );
        }

    }
}

export default IssueCreate;