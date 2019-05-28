import React, {Component} from "react";
import {userService} from "../../_services/user.service";
import {commentService} from "../../_services/comment.service";
import Button from '@material-ui/core/Button';

const img = {
    marginLeft: '0px',
    borderRadius: '50%',
};

class Comment extends Component{
    constructor(props){
        super(props);
        this.state= {
            comment: this.props.comment,
            reporter_name: '',
            reporter_foto: '',
        };
        this.deleteComment = this.deleteComment.bind(this);
    }

    componentDidMount() {
        this.getUserInfo(this.state.comment.reporter_id);
    }

    getUserInfo(id) {
        userService.getByID(id)
            .then ( data => {
                this.setState({reporter_name: data.name, reporter_foto: data.foto});
            })
            .catch(error => {
                console.log(error);
            });
    }

    deleteComment(){
        if (window.confirm("Seguro que quieres eliminar el comentario?")) {
            commentService.destroy(this.state.comment.id)
                .then(() => {
                    this.props.actualizar();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    editComment() {
        //Ir al sitio para editar el commentario
    }

    render(){
        let data = this.state.comment.updated_at.substring(0, 10);
        return(
            <div>
                <table width="50%" >
                    <tr>
                        <td rowSpan="2"><img
                            style={img}
                            width="48"
                            height="48"
                            src={this.state.reporter_foto}
                        /></td>
                        <td><h6 className="mt-0 mb-1 text-muted"> <p align="left"> {this.state.reporter_name} {this.state.comment.reporter_id} </p> </h6></td>
                        <td><small className="float-right text-muted"> <p align="left"> {data} </p> </small></td>
                    </tr>
                    <tr>
                        <td colSpan="2"> <p align="left"> {this.state.comment.text} </p> </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td> <Button variant="contained" color="primary" onClick={ () => this.editComment()} size="small"> EDIT </Button> </td>
                        <td> <Button variant="contained" color="secondary" onClick={ () => this.deleteComment()} size="small"> DELETE </Button> </td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default Comment;