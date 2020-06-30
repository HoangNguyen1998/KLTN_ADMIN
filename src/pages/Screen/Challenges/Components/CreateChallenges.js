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


const CreateChallenges = (props) => {
    // DEFINE
    const { history, enqueueSnackbar, _closeModal, setIsLoading } = props;
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
    const _createChallenge = async () => {
        console.log("huhu");
        try {
            console.log("khong vao day ak");
            const res = await listApi._postData("challenges", {
                question: question,
                choice_1: choice_1,
                choice_2: choice_2,
                answer: parseInt(answer),
                explanation: explan,
                level: parseInt(level),
                index: parseInt(index),
            });
            dispatch(
                challengesActions.Get_All_Challenges_Request(
                    setIsLoading,
                    enqueueSnackbar
                )
            );
            _closeModal()
        } catch (err) {
            console.log(err.response.message);
        }
    };
    // RENDER
    return (
        <div style={{ marginTop: "2rem" }}>
            <div>
                <TextField
                    style={{ marginBottom: "2rem" }}
                    value={index}
                    onChange={(e) => setIndex(e.target.value)}
                    label="Câu số: "
                    variant="outlined"
                    InputLabelProps={{
                        style: { fontSize: "1.6rem" },
                    }}
                    fullWidth
                    multiline
                />
            </div>
            <div>
                <TextField
                    style={{ marginBottom: "2rem" }}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    label="Câu hỏi"
                    variant="outlined"
                    InputLabelProps={{
                        style: { fontSize: "1.6rem" },
                    }}
                    fullWidth
                    multiline
                />
            </div>
            <div>
                <TextField
                    style={{ marginBottom: "2rem" }}
                    value={choice_1}
                    onChange={(e) => setChoice_1(e.target.value)}
                    label="Lựa chọn 1"
                    InputLabelProps={{
                        style: { fontSize: "1.6rem" },
                    }}
                    variant="outlined"
                    fullWidth
                    multiline
                />
            </div>
            <div>
                <TextField
                    style={{ marginBottom: "2rem" }}
                    value={choice_2}
                    onChange={(e) => setChoice_2(e.target.value)}
                    label="Lựa chọn 2"
                    InputLabelProps={{
                        style: { fontSize: "1.6rem" },
                    }}
                    variant="outlined"
                    fullWidth
                    multiline
                />
            </div>
            <div>
                <TextField
                    style={{ marginBottom: "2rem" }}
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    label="Lựa chọn đúng"
                    InputLabelProps={{
                        style: { fontSize: "1.6rem" },
                    }}
                    variant="outlined"
                    fullWidth
                    multiline
                />
            </div>
            <div>
                <TextField
                    style={{ marginBottom: "2rem" }}
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    label="Cấp độ"
                    InputLabelProps={{
                        style: { fontSize: "1.6rem" },
                    }}
                    variant="outlined"
                    fullWidth
                    multiline
                />
            </div>
            <div>
                <TextField
                    style={{ marginBottom: "2rem" }}
                    value={explan}
                    onChange={(e) => setExplan(e.target.value)}
                    label="Giải thích"
                    InputLabelProps={{
                        style: { fontSize: "1.6rem" },
                    }}
                    variant="outlined"
                    fullWidth
                    multiline
                />
            </div>
            <div>
                <Button onClick={() => _closeModal()}>Huỷ</Button>
                <Button onClick={() => _createChallenge()}>Tạo khoá học</Button>
            </div>
        </div>
    );
};

export default withRouter(withSnackbar(CreateChallenges));
