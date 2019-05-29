import React, {Component} from "react";
import AppBar from '@material-ui/core/AppBar';
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import PropTypes from "prop-types";
import Link from "react-router-dom/es/Link";
import AuthButton from "../AuthButton/AuthButton";
import '../../views/Issues/issues.css';


const WelcStyle = {
    fontSize: '30px',
    textAlign: 'center',
};

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};


class Header extends Component{
    constructor(props){
        super(props);
        this.state={
            Drawer_left:false,
            Titulo: 'App',
        };
    }

    render(){
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow} align="center">
                            <Link to="/"><p className='titulo' style={WelcStyle} align="center"><b>Issue tracker ASW!</b></p></Link>
                        </Typography>
                        <AuthButton/>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
