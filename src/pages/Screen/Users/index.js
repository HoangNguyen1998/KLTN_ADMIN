import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import './styles.scss'

const Users = (props) => {
    return (
        <div>
            day la trang quan ly users
        </div>
    )
}

export default withRouter(Users);
