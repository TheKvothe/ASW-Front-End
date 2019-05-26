import React from "react";
import {userService} from "../../_services/user.service";
import {commentService} from "../../_services/comment.service";
import Button from '@material-ui/core/Button';

const img = {
    marginLeft: '0px',
    borderRadius: '50%',
};

var name = null;
var foto = null;

function getUserInfo(id) {
    userService.getByID(id)
        .then ( data => {
            name = data.name;
            foto = data.foto;
        });
}


export default function Comment(props) {
    const { id, reporter_id, text, updated_at, issue_id } = props.comment;
    let data = updated_at.substring(0, 10);

    // Imprime mal el nombre i el avatar del usuario sempre coje solo uno independiente de que son id's diferentes
    getUserInfo(reporter_id);

    function deleteComment(){
        commentService.destroy(id);
        // No refresca bien la pagina una vez borras el comentario
        //this.props.history.push("/issues/" + issue_id);
    }

    function editComment() {
        // Ir al sitio para editar el commentario
        this.props.history.push("/comments/" + id + "/edit")
    }

    return (
        <div>
            <table width="50%" >
                <tr>
                    <td rowSpan="2"><img
                        style={img}
                        width="48"
                        height="48"
                        src={foto}
                    /></td>
                    <td><h6 className="mt-0 mb-1 text-muted"> <p align="left"> {name} {reporter_id} </p> </h6></td>
                    <td><small className="float-right text-muted"> <p align="left"> {data} </p> </small></td>
                </tr>
                <tr>
                    <td colSpan="2"> <p align="left"> {text} </p> </td>
                </tr>
                <tr>
                    <td></td>
                    <td> <Button variant="contained" color="primary" onClick={ () => editComment()} size="small"> EDIT </Button> </td>
                    <td> <Button variant="contained" color="secondary" onClick={ () => deleteComment()} size="small"> DELETE </Button> </td>
                </tr>
            </table>
        </div>
    );
}