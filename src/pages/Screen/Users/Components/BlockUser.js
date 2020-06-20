import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { withSnackbar } from "notistack";
import { withRouter } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

// import "./styles.scss";
import { Button } from "@material-ui/core";
import * as usersActions from "actions/Users";

const BlockUser = (props) => {
    // -----    DEFINE  -----
    const dispatch = useDispatch();
    const { id, status, _closeModal, enqueueSnackbar } = props;
    // -----    STATE   -----
    const [isLoading, setIsLoading] = useState(false);
    // -----    USEEFFECT   -----
    // -----    FUNC    -----
    const _blockUser = (id) => {
        setIsLoading(true);
        dispatch(
            usersActions.Block_User_Request(
                enqueueSnackbar,
                setIsLoading,
                _closeModal,
                id
            )
        );
    };
    // -----    RENDER  -----
    if (isLoading) {
        return (
            <div style={{ textAlign: "center" }}>
                <CircularProgress />
            </div>
        );
    }
    if (status === "active") {
        return (
            <div style={{ marginTop: "2rem" }}>
                <div>
                    Ban co chac chan muon khoa tai khoan nguoi dung nay khong?
                </div>
                <div>
                    <Button onClick={() => _blockUser(id)}>Co</Button>
                    <Button onClick={() => _closeModal()}>Khong</Button>
                </div>
            </div>
        );
    }
    if (status === "deactive") {
        return (
            <div style={{ marginTop: "2rem" }}>
                <div>
                    Ban co chac chan muon mo khoa tai khoan nguoi dung nay
                    khong?
                </div>
                <div>
                    <Button onClick={() => _blockUser(id)}>Co</Button>
                    <Button onClick={() => _closeModal()}>Khong</Button>
                </div>
            </div>
        );
    }
};

export default withRouter(withSnackbar(BlockUser));
