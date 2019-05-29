import React, {Component} from "react";
import Comment from "./Comment";
import {commentService} from "../../_services/comment.service";

const TitleStyle = {
    fontSize: '20px',
    marginTop: '15px',
    marginLeft: '15px',
};

class CommentList extends Component{
    constructor(props) {
        super(props);
        this.state= {
            id: this.props.id,
            comments: null,
        };
        this.actualiza = this.actualiza.bind(this);
    }

    componentDidMount(){
        this.GetData();
    }

    GetData(){
        commentService.getIssueComments(this.props.id)
            .then( (res) => {
                this.setState({comments: res});
            })
    }

    actualiza(){
        this.GetData();
    }

    render() {
        if (this.state.comments == null)
            return <div></div>
        else{
            return (
                <div className="commentList">
                    <h5 align={"left"}>
                <span style={TitleStyle} > Comment{this.state.comments.length > 0 ? "s " : " "}
                    ({this.state.comments.length})</span>{" "}
                    </h5>
                    {this.state.comments.map((comment, index) => (
                        <Comment key={index} comment={comment} actualizar={this.actualiza}/>
                    ))}
                </div>
            );
        }
    }
}

export default CommentList;