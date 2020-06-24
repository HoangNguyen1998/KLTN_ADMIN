import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { withSnackbar } from "notistack";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

// import "./styles.scss";
import { Button } from "@material-ui/core";
import * as usersActions from "actions/Users";
import * as listApi from "helpers/ListApi";

const ReportDetail = (props) => {
    // -----    DEFINE  -----
    const dispatch = useDispatch();
    const { item, _closeModal, enqueueSnackbar } = props;
    // -----    STATE   -----
    const [cmt, setCmt] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    // -----    USEEFFECT   -----
    useEffect(() => {
        _getCommentDetail();
    }, []);
    // -----    FUNC    -----
    const _deleteCmt = async (id) => {
        console.log(id);
        setIsLoading(true);
        const res = await listApi._deleteData(`comments/${id}`);
        console.log(res);
        _closeModal();
        setIsLoading(false);
    };
    const _getCommentDetail = async () => {
        const res = await listApi._getData(`comments/${item.commentId}`);
        console.log(res);
    };
    // -----    RENDER  -----
    if (isLoading) {
        return (
            <div style={{ textAlign: "center" }}>
                <CircularProgress />
            </div>
        );
    }
    return (
        <div>
            <div>
                <div>Noi dung bao cao vi pham: </div>
                <div
                    style={{
                        border: "0.1rem solid",
                        padding: "1rem",
                        borderRadius: "1rem",
                    }}
                >
                    {item.content}
                </div>
            </div>
            <div style={{ marginTop: "1rem" }}>
                <Button onClick={() => _closeModal()}>Huy</Button>
                <Button onClick={() => _deleteCmt(item.commentId)}>
                    Xoa tin nhan nay
                </Button>
            </div>
        </div>
    );
};

export default withRouter(withSnackbar(ReportDetail));
