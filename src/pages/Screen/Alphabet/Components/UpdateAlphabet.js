import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { withSnackbar } from "notistack";
import { withRouter } from "react-router-dom";
import {
    CircularProgress,
    TextField,
    Grid,
    IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import "../styles.scss";
import { isEmpty } from "lodash";
import * as alphabetActions from "actions/Alphabet";
const UpdateAlphabet = (props) => {
    // -----    DEFINE  -----
    const dispatch = useDispatch();
    const alphabetDetailRedux = useSelector(
        (state) => state.Alphabet.alphabetDetail
    );
    const { id, enqueueSnackbar, _closeModal } = props;
    // -----    STATE   -----
    const [isLoading, setIsLoading] = useState(true);
    const [edit, setEdit] = useState(false);
    const [romaji, setRomaji] = useState("");
    const [hira, setHira] = useState("");
    const [kata, setKata] = useState("");
    // -----    USEEFFECT   -----
    useEffect(() => {
        dispatch(alphabetActions.Get_Alphabet_Detail_Request(setIsLoading, id));
    }, []);
    useEffect(() => {
        if (!isEmpty(alphabetDetailRedux)) {
            console.log("rende");
            setRomaji(alphabetDetailRedux.romaji);
            setHira(alphabetDetailRedux.hira);
            setKata(alphabetDetailRedux.kata);
        }
    }, [alphabetDetailRedux]);
    // -----    FUNC    -----
    const _updateAlphabetDetail = () => {
        setIsLoading(true);
        dispatch(
            alphabetActions.Update_Alphabet_Detail_Request(
                _closeModal,
                enqueueSnackbar,
                setIsLoading,
                id,
                {
                    romaji: romaji,
                    hira: hira,
                    kata: kata,
                }
            )
        );
    };
    const _renderWordHira = (item) => {
        var i = 0;
        var arr = [];
        let word = null;
        let test = null;
        let svg = null;
        if (item) {
            word = item.hira;
            if (word) {
                test = word.split("");
            }
            if (test) {
                if (test.length === 1) {
                    svg = ("00000" + word.charCodeAt(0).toString(16)).slice(-5);
                    return `http://learn-jp-kltn.herokuapp.com/api/assets/svgAlphabet/${svg}.svg`;
                }
            }
            if (test.length > 1) {
                for (i = 0; i < test.length; i++) {
                    console.log("???????: ", test[i]);
                    svg = ("00000" + test[i].charCodeAt(0).toString(16)).slice(
                        -5
                    );
                    arr = [
                        ...arr,
                        `http://learn-jp-kltn.herokuapp.com/api/assets/svgAlphabet/${svg}.svg`,
                    ];
                }
                console.log(arr);
                return arr;
            }
        }
        return null;
    };
    const _renderWordKata = (item) => {
        var i = 0;
        var arr = [];
        let word = null;
        let test = null;
        let svg = null;
        if (item) {
            word = item.kata;
            if (word) {
                test = word.split("");
            }
            if (test) {
                if (test.length === 1) {
                    svg = ("00000" + word.charCodeAt(0).toString(16)).slice(-5);
                    return `http://learn-jp-kltn.herokuapp.com/api/assets/svgAlphabet/${svg}.svg`;
                }
            }
            if (test.length > 1) {
                for (i = 0; i < test.length; i++) {
                    console.log("???????: ", test[i]);
                    svg = ("00000" + test[i].charCodeAt(0).toString(16)).slice(
                        -5
                    );
                    arr = [
                        ...arr,
                        `http://learn-jp-kltn.herokuapp.com/api/assets/svgAlphabet/${svg}.svg`,
                    ];
                }
                console.log(arr);
                return arr;
            }
        }
        return null;
    };
    const _renderDetail = (data) => {
        console.log(data);
        if (!isEmpty(data)) {
            return (
                <div>
                    <TextField
                        style={{ width: "100%" }}
                        value={romaji}
                        onChange={(e) => setRomaji(e.target.value)}
                        label="Romaji"
                    />

                    <TextField
                        style={{ width: "100%" }}
                        value={hira}
                        onChange={(e) => setHira(e.target.value)}
                        label="Hiragana"
                    />

                    <TextField
                        style={{ width: "100%" }}
                        value={kata}
                        onChange={(e) => setKata(e.target.value)}
                        label="Katakana"
                    />

                    <div
                        style={{
                            marginTop: "2rem",
                            display: "flex",
                            justifyContent: "space-evenly",
                        }}
                    >
                        <div>
                            <div>Hiragana image: </div>
                            <img
                                alt="error"
                                src={_renderWordHira(data)}
                                style={{ width: "15rem" }}
                            />
                        </div>
                        <div>
                            <div>Hiragana image: </div>
                            <img
                                alt="error"
                                src={_renderWordKata(data)}
                                style={{ width: "15rem" }}
                            />
                        </div>
                    </div>
                    <div>
                        {edit ? (
                            <IconButton>
                                <SaveIcon />
                            </IconButton>
                        ) : (
                            <IconButton onClick={() => _updateAlphabetDetail()}>
                                <EditIcon />
                            </IconButton>
                        )}
                        <IconButton>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </div>
            );
        }
    };
    // -----    RENDER  -----
    if (isLoading) {
        return (
            <div style={{ textAlign: "center" }}>
                <CircularProgress />
            </div>
        );
    }
    return <div>{_renderDetail(alphabetDetailRedux)}</div>;
};

export default withRouter(withSnackbar(UpdateAlphabet));
