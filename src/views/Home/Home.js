import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
//import {palabraService} from '../../_services/palabra.service';

const WelcStyle = {
    fontSize: '30px',
    textAlign: 'center',
    marginTop: '15px',
};


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categorias: [],
            temas: [],
            palabras: [],
        }
    }

    componentDidMount(){
        //this.GetData();
    }

    /*GetData(){
        palabraService.getAll()
            .then(data => {
                const palabras = data;
                this.setState({palabras});
            });
    }*/

    render() {
        return(
            <Grid container justify={"center"} spacing={40}>
                <Grid item xs={12}>
                    <p style={WelcStyle} align="center"><b>Issue tracker ASW!</b></p>
                </Grid>
            </Grid>
        );
    }
}

export default Home;