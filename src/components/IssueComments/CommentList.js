import React, {Component} from "react";
import Comment from "./Comment";

const TitleStyle = {
    fontSize: '20px',
    marginTop: '15px',
    marginLeft: '15px',
};

class CommentList extends Component{
    constructor(props) {
        super(props);
        this.state= {
            comments: this.props.comments,
        };
    }

    render() {
        if (this.state.comments == null)
            return <div></div>
        else{
            return (
                <div className="commentList">
                    <h5 align={"left"}>
                <span style={TitleStyle} > Comment{this.props.comments.length > 0 ? "s " : " "}
                    ({this.props.comments.length})</span>{" "}
                    </h5>
                    {this.props.comments.map((comment, index) => (
                        <Comment history={this.props.history} key={index} comment={comment} actualizar={this.props.actualizar}/>
                    ))}
                </div>
            );
        }
    }
}


export default CommentList;