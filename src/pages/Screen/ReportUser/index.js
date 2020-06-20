import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { withSnackbar } from "notistack";
import { withRouter } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./styles.scss";

const ReportUser = (props) => {
    // -----    DEFINE  -----
    const dispatch = useDispatch();
    const { enqueueSnackbar } = props;
    // -----    STATE   -----
    const [isLoading, setIsLoading] = useState(true);
    // -----    USEEFFECT   -----
    // -----    FUNC    -----
    // -----    RENDER  -----
    return <div>HELLO</div>;
};

export default withRouter(withSnackbar(ReportUser));
