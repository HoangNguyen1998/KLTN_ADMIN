import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import DnsRoundedIcon from "@material-ui/icons/DnsRounded";
import PermMediaOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActual";
import PublicIcon from "@material-ui/icons/Public";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import SettingsInputComponentIcon from "@material-ui/icons/SettingsInputComponent";
import TimerIcon from "@material-ui/icons/Timer";
import SettingsIcon from "@material-ui/icons/Settings";
import TranslateIcon from "@material-ui/icons/Translate";
import PhonelinkSetupIcon from "@material-ui/icons/PhonelinkSetup";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import GestureIcon from "@material-ui/icons/Gesture";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ReportIcon from "@material-ui/icons/Report";
import LandscapeIcon from "@material-ui/icons/Landscape";
import { withStyles } from "@material-ui/core/styles";

import styles from "./styles";

const categories = [
    {
        id: "Develop",
        children: [
            { id: "Users", icon: <PeopleIcon />, active: true },
            { id: "Challenges", icon: <LandscapeIcon /> },
            { id: "Topics", icon: <MenuBookIcon /> },
            { id: "Alphabet", icon: <TranslateIcon /> },
            { id: "Video", icon: <VideoLibraryIcon /> },
            { id: "Reports", icon: <ReportIcon /> },
        ],
    },
];

const NavigatorCustom = (props) => {
    useEffect(() => {
        categories.map(({ id, children }) => {
            children.map(({ id: childId }) => {
                let checkPathname = `/${childId}`;
                const { pathname } = props.history.location;
                if (pathname === checkPathname) {
                    setCategory(childId);
                }
            });
        });
    });
    const [category, setCategory] = useState("Authentication");
    const { classes, ...other } = props;
    const _useListItem = (childId) => {
        let checkPathname = `/${childId}`;
        setCategory(childId);
        const { history } = props;
        const { location } = history;
        if (location.pathname !== checkPathname) {
            props.history.push(checkPathname);
        }
    };

    return (
        <Drawer style={{ zIndex: 0 }} variant="permanent" {...other}>
            <List disablePadding>
                <ListItem
                    className={clsx(
                        classes.firebase,
                        classes.item,
                        classes.itemCategory
                    )}
                >
                    Admin
                </ListItem>

                {categories.map(({ id, children }) => (
                    <React.Fragment key={id}>
                        {children.map(({ id: childId, icon, active }) => (
                            <ListItem
                                key={childId}
                                button
                                onClick={() => _useListItem(childId)}
                                className={clsx(
                                    classes.item,
                                    category === childId &&
                                        classes.itemActiveItem
                                )}
                            >
                                <ListItemIcon className={classes.itemIcon}>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText
                                    classes={{
                                        primary: classes.itemPrimary,
                                    }}
                                >
                                    {childId}
                                </ListItemText>
                            </ListItem>
                        ))}

                        <Divider className={classes.divider} />
                    </React.Fragment>
                ))}
            </List>
        </Drawer>
    );
};

NavigatorCustom.propTypes = {
    classes: PropTypes.object.isRequired,
};

const compose = withRouter(NavigatorCustom);

export default withStyles(styles)(compose);
