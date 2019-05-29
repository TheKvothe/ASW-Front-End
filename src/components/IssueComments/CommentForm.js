import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import {commentService} from "../../_services/comment.service";
import './comments.css';

const img = {
    marginLeft: '15px',
    borderRadius: '50%',
    marginRight: '15px',
};
const button = {
    marginLeft: '15px',
};


class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: "",

            comment: {
                message: ""
            },

            CU_avatar: localStorage.getItem('foto'),
            issue_id: this.props.id,
        };

        // bind context to methods
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * Handle form input field changes & update the state
     */
    handleFieldChange = event => {
        const { value, name } = event.target;

        this.setState({
            ...this.state,
            comment: {
                ...this.state.comment,
                [name]: value
            }
        });
    };

    /**
     * Form submit handler
     */
    onSubmit(e) {
        // prevent default form submission
        e.preventDefault();

        if (!this.isFormValid()) {
            this.setState({ error: "All fields are required." });
            return;
        }

        // loading status and clear error
        this.setState({ error: "", loading: true });

        // persist the comments on server
        //console.log(this.state.comment.message);
        //console.log(this.state.issue_id);
        commentService.post( this.state.issue_id ,this.state.comment.message)
            .then( () => {
                    this.props.actualizar();
                this.setState({
                    ...this.state,
                    comment: {
                        ...this.state.comment,
                        message: ''
                    }
                });
            })
    }

    /**
     * Simple validation
     */
    isFormValid() {
        return this.state.comment.message !== "";
    }

    renderError() {
        return this.state.error ? (
            <div className="alert alert-danger">{this.state.error}</div>
        ) : null;
    }

    render() {
        return (
            <React.Fragment>
                <form method="post" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <img className='avatarPost' style={img} src={this.state.CU_avatar} alt="avatar" />
                        <textarea
                            onChange={this.handleFieldChange}
                            value={this.state.comment.message}
                            className="form-control"
                            placeholder="What do you want to say?"
                            name="message"
                            rows=""
                            cols="100"
                        />
                        <Button type="submit" style={button} variant="contained" color="primary" size="small"> Comment &#10148; </Button>
                    </div>

                    {this.renderError()}

                </form>
            </React.Fragment>
        );
    }
}

export default CommentForm;