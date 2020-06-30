import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { withSnackbar } from "notistack";
import { withRouter } from "react-router-dom";
import {
    Box,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    Paper,
    IconButton,
    Card,
    Button,
    CircularProgress,
    TextField,
    Tooltip,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";

import * as topicsActions from "actions/Topics";
import * as listApi from "helpers/ListApi";
import * as challengesActions from "actions/Challenges";

const DeleteChallenges = (props) => {
    // DEFINE
    const { history, enqueueSnackbar, _closeModal, setIsLoading, item } = props;
    const { i18n, t } = useTranslation("translation");
    const dispatch = useDispatch();

    // STATE
    const [question, setQuestion] = useState("");
    const [choice_1, setChoice_1] = useState("");
    const [choice_2, setChoice_2] = useState("");
    const [answer, setAnswer] = useState("");
    const [explan, setExplan] = useState("");
    const [level, setLevel] = useState("");
    const [index, setIndex] = useState("");
    // USEEFFECT

    // FUNC
    const _deleteChallenges = async () => {
        console.log("huhu");
        try {
            console.log("khong vao day ak");
            const res = await listApi._deleteData(`challenges/${item._id}`);
            dispatch(
                challengesActions.Get_All_Challenges_Request(
                    setIsLoading,
                    enqueueSnackbar
                )
            );
            _closeModal();
        } catch (err) {
            console.log(err.response.message);
        }
    };
    // RENDER
    return (
        <div style={{ marginTop: "2rem" }}>
            <div>Bạn có chắc chắn muốn xoá thử thách này không?</div>
            <div>
                <Button onClick={() => _closeModal()}>Huỷ</Button>
                <Button onClick={() => _deleteChallenges()}>Xoá</Button>
            </div>
        </div>
    );
};

export default withRouter(withSnackbar(DeleteChallenges));
