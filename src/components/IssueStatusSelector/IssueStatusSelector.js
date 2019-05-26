import React from 'react';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {issueService} from '../../_services/issue.service';

let s = "";
let statusActual= "";

function StatusSelector(id) {

    issueService.getByID(id.id)
        .then(data => {
            statusActual = data.status;
        });

    const [values, setValues] = React.useState({
        status: s,
    });



    function handleChange(event) {
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
       issueService.updateStatus(id.id, event.target.value);
       statusActual=event.target.value;
    }

    return (
        <form autoComplete="off">
            <FormControl variant="filled" >
                <InputLabel htmlFor="filled-status-simple">Status</InputLabel>
                <Select
                    value={statusActual}
                    onChange={handleChange}
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

export default StatusSelector;