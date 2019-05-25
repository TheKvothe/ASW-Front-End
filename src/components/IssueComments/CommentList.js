import React from "react";
import Comment from "./Comment";

const TitleStyle = {
    fontSize: '20px',
    marginTop: '15px',
    marginLeft: '15px',
};

export default function CommentList(props) {
    return (
        <div className="commentList">
            <h5 align={"left"}>
                <span style={TitleStyle} > Comment{props.comments.length > 0 ? "s " : " "}
                    ({props.comments.length})</span>{" "}
            </h5>
            {props.comments.map((comment, index) => (
                <Comment key={index} comment={comment} />
            ))}
        </div>
    );
}