import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { withSnackbar } from "notistack";
import { withRouter } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { Table, Input, Button, Space } from "antd";
import { CircularProgress, TextField } from "@material-ui/core";
import Highlighter from "react-highlight-words";

import "../styles.scss";
import * as listApi from 'helpers/ListApi'
import * as challengesActions from "actions/Challenges";

const ChallengesDetail = (props) => {
    // -----    DEFINE  -----
    const dispatch = useDispatch();
    const { item, _closeModal, setIsLoading, enqueueSnackbar } = props;

    // -----    STATE   -----
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [question, setQuestion] = useState("");
    const [choice_1, setChoice_1] = useState("");
    const [choice_2, setChoice_2] = useState("");
    const [answer, setAnswer] = useState("");
    const [explan, setExplan] = useState("");
    const [level, setLevel] = useState("");
    const [index, setIndex] = useState("");
    // -----    USEEFFECT   -----
    useEffect(() => {
        setQuestion(item.question);
        setChoice_1(item.choice_1);
        setChoice_2(item.choice_2);
        setAnswer(item.answer);
        setExplan(item.explanation);
        setLevel(item.level);
        setIndex(item.index);
    }, []);
    // -----    FUNC    -----
    const _updateChallenge = async () => {
        try {
            console.log("khong vao day ak");
            const res = await listApi._puttData(`challenges/${item._id}`, {
                question: question,
                choice_1: choice_1,
                choice_2: choice_2,
                answer: (answer),
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
    // -----    RENDER  -----
    return (
        <div>
            {" "}
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
                    <Button onClick={() => _updateChallenge()}>
                        Lưu
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default withRouter(withSnackbar(ChallengesDetail));
