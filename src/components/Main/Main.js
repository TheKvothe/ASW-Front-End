import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import Home from "../../views/Home/Home";
//import Login from "../../views/Login/Login";
//import PrivateRoute from "../PrivateRoute/PrivateRoute";


const Protected = () => <h3>Protected</h3>;


class Main extends Component{
    render(){
        return (
                <div>
                    <Switch>
                        {/*<Route path="/login" component={Login}/>*/}
                        {/*<PrivateRoute path='/protected' component={Protected} />*/}
                        <Route exact path="/" component={Home}/>
                        {/*<PrivateRoute path="/Categorias" component={Categorias}/>
                        <PrivateRoute path="/Categoria/:id" component={Categoria}/>*/}
                    </Switch>
                </div>
        );
    }

}

export default Main;