import React, {Component} from 'react';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {issueService} from '../../_services/issue.service';


class StatusSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            s: '',
            statusActual: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        issueService.getByID(this.state.id)
            .then(data => {
                this.setState({statusActual: data.status});
            });
    }

    handleChange(event) {
        this.setState({statusActual: event.target.value});
        issueService.updateStatus(this.state.id, event.target.value)
            .then(() => {
                this.props.actualizar();
            });
    }

    render() {
        return (
            <form autoComplete="off">
                <FormControl variant="filled" >
                    <InputLabel htmlFor="filled-status-simple">Status</InputLabel>
                    <Select
                        value={this.state.statusActual}
                        onChange={this.handleChange}
                        input={<FilledInput name="status" id="filled-status-simple" />}
                    >
                        <MenuItem value={"new"}>new</MenuItem>
                        <MenuItem value={"open"}>open</MenuItem>
                        <MenuItem value={"on hold"}>on hold</MenuItem>
                        <MenuItem value={"resolved"}>resolved</MenuItem>
                        <MenuItem value={"duplicate"}>duplicate</MenuItem>
                        <MenuItem value={"invalid"}>invalid</MenuItem>
                        <MenuItem value={"wontfix"}>wontfix</MenuItem>
                        <MenuItem value={"closed"}>closed</MenuItem>
                    </Select>
                </FormControl>
            </form>
        );
    }

}

export default StatusSelector;