import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import Issues from "../../views/Issues/Issues";
import Login from "../../views/login/login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";


const Protected = () => <h3>Protected</h3>;


class Main extends Component{
    render(){
        return (
                <div>
                    <Switch>
                        {/*<Route path="/login" component={Login}/>*/}
                        <PrivateRoute path='/protected' component={Protected} />
                        <PrivateRoute exact path="/" component={Issues}/>
                        <Route  path='/login' component={Login}/>
                        {/*<PrivateRoute path="/Categorias" component={Categorias}/>
                        <PrivateRoute path="/Categoria/:id" component={Categoria}/>*/}
                    </Switch>
                </div>
        );
    }

}

export default Main;