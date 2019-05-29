import React, {Component} from "react";
import {commentService} from "../../_services/comment.service";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {Link, Redirect} from "react-router-dom";
import Button from "@material-ui/core/Button";

const text = {
    marginTop: '45px',
    marginBottom: '25px',
};

const button = {
    marginLeft: '15px',
};

class CommentEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            comment: null,
            redirect: false,
        };
        this.updateComment = this.updateComment.bind(this);
    }

    componentDidMount(){
        this.GetData();
    }

    GetData(){
        commentService.getByID(this.state.id)
            .then(data => {
                this.setState({comment: data});
            });
    }

    handleChange = name => event => {
        var auxComment = this.state.comment;
        auxComment[name] = event.target.value;
        this.setState({ comment: auxComment });
    };

    updateComment(){
        const id = this.state.id;
        let text = this.state.comment.text;
        //console.log(id);
        //console.log(text);
        commentService.update(id,text)
            .then( () => {
                this.setState({redirect: true})
            });
    }

    render() {
        if (this.state.redirect) return <Redirect to={'/issues/' + this.state.comment.issue_id} push /> ;
        else{
            if (this.state.comment != null) {
                return(
                    <Grid container spacing={40} justify="flex-start" alignItems="flex-start">
                        <Grid item xs={12}>
                            < TextField style={text}
                                id="outlined-multiline-flexible"
                                label="Comment text"
                                multiline
                                rowsMax="4"
                                value={this.state.comment.text}
                                onChange={this.handleChange('text')}
                                margin="normal"
                                variant="outlined"
                            />
                            <br></br>
                            <Link to={'/issues/' + this.state.comment.issue_id}><Button variant="contained" color="secondary">Back</Button></Link>
                            <Button style={button} variant="contained" color="primary" onClick={this.updateComment}>Update Comment</Button>
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
}

export default CommentEdit;