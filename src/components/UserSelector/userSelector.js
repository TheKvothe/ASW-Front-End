import React, {Component} from 'react';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {issueService} from '../../_services/issue.service';
import {userService} from "../../_services/user.service";


class UserSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            current: '',
            users: null,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.GetData();
    }

    GetData(){
        userService.getAll()
            .then(data => {
                console.log(data);
                this.setState({users: data});
            });
        issueService.getByID(this.props.id)
            .then(data => {
                this.setState({current: data.assignee_id});
            });
    }

    handleChange(event) {
        this.setState({current: event.target.value});
        this.props.sendAssignee(event.target.value);
    }

    render() {
        if (this.state.users == null){
            return <div></div>
        }
        else{
            return (
                <form autoComplete="off">
                    <FormControl variant="filled" >
                        <InputLabel htmlFor="filled-status-simple">Assignee</InputLabel>
                        <Select
                            value={this.state.current}
                            onChange={this.handleChange}
                            input={<FilledInput name="assignee" id="filled-assignee-simple" />}
                        >
                            {this.state.users.map( user => {
                                return(
                                    <MenuItem value={user.id}>{user.name}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </form>
            );
        }
    }

}

export default UserSelector;