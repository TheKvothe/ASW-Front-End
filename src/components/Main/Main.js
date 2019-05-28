import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import Issues from "../../views/Issues/Issues";
import IssueEdit from '../../views/Issues/IssueEdit'
import Login from "../../views/login/login";
import Issue from "../../views/Issues/Issue";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import IssueCreate from "../../views/Issues/IssueCreate";


const Protected = () => <h3>Protected</h3>;


class Main extends Component{
    render(){
        return (
                <div>
                    <Switch>
                        <Route  path='/login' component={Login}/>
                        <PrivateRoute exact path="/" component={Issues}/>
                        <PrivateRoute exact path='/issues/new' component={IssueCreate}/>
                        <PrivateRoute exact path='/issues/:id' component={Issue} />
                        <PrivateRoute path='/issues/:id/edit' component={IssueEdit}/>
                        <PrivateRoute path='/protected' component={Protected} />
                    </Switch>
                </div>
        );
    }

}

export default Main;