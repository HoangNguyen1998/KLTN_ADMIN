import React from "react";
import "styles/global.scss";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Switch, Route, withRouter } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import NavigatorCustom from "./Components/NavigatorCustom";
import AppBarCustom from "./Components/AppBarCustom";
import IndexRoutes from "routes/IndexRoutes";
import Users from 'pages/Screen/Users'

const drawerWidth = 256;

const styles = (theme) => ({
    root: {
        display: "flex",
        minHeight: "100vh",
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    app: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
    main: {
        flex: 1,
        padding: theme.spacing(6, 4),
        background: "#eaeff1",
    },
});

const HomePage = (props) => {
    const { classes } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <nav className={classes.drawer}>
                <Hidden smUp implementation="js">
                    <NavigatorCustom
                        PaperProps={{ style: { width: drawerWidth } }}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                    />
                </Hidden>
                <Hidden xsDown implementation="css">
                    <NavigatorCustom
                        PaperProps={{ style: { width: drawerWidth } }}
                    />
                </Hidden>
            </nav>
            <div className={classes.app}>
                <AppBarCustom onDrawerToggle={handleDrawerToggle} />
                <main className="container">
                    <Switch>
                        {IndexRoutes.map((prop, key) => {
                            return (
                                <Route
                                    path={prop.path}
                                    exact={prop.exact}
                                    component={prop.main}
                                    key={key}
                                />
                            );
                        })}
                    </Switch>
                </main>
            </div>
        </div>
    );
};

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
};

const compose = withRouter(HomePage)

export default withStyles(styles)(compose);
