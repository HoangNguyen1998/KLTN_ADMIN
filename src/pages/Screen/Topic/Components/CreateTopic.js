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
const CreateTopic = (props) => {
    const { history, enqueueSnackbar, setIsLoading } = props;
    const { i18n, t } = useTranslation("translation");
    const circularRedux = useSelector((state) => state.Loading.showCircular);
    const [array, setArray] = useState({
        title: "",
        voca: [
            {
                text: "",
                kanji_text: "",
                kanji_meaning: "",
                vocabulary_meaning: "",
            },
            {
                text: "",
                kanji_text: "",
                kanji_meaning: "",
                vocabulary_meaning: "",
            },
        ],
    });
    const AddCourseValue = useSelector((state) => {
        return state.Courses.course;
    });
    const dispatch = useDispatch();
    const onAddNewCard = () => {
        const item = {
            text: "",
            kanji_text: "",
            kanji_meaning: "",
            vocabulary_meaning: "",
        };
        const data = [...array.voca];
        data.push(item);
        setArray({ ...array, voca: data });
    };
    const handleChange = (event) => {
        var value = event.target.value;
        setArray({ ...array, title: value });
    };
    const onDeleteCard = (index) => {
        const data = [...array.voca];
        data.splice(index, 1);
        setArray({ ...array, voca: data });
    };
    const onChange = (event, index) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        const data = [...array.voca];
        if (name === "text") {
            data[index].text = value;
        }
        if (name === "vocabulary_meaning") {
            data[index].vocabulary_meaning = value;
        }
        if (name === "kanji_meaning") {
            data[index].kanji_meaning = value;
        }
        if (name === "kanji_text") {
            data[index].kanji_text = value;
        }
        setArray({ ...array, voca: data });
    };
    const onHandleSubmit = async (event) => {
        event.preventDefault();
        // dispatch(
        //     CoursesActions.Add_Course_Request(
        //         array,
        //         history,
        //         enqueueSnackbar,
        //         t
        //     )
        // );
        try {
            const res = await listApi._postData("topics/createAdmin", array);
            console.log(res);
            topicsActions.Get_Topics_Request(setIsLoading, enqueueSnackbar);
        } catch (err) {
            console.log(err.response.message);
        }
    };
    const renderCard = (data) => {
        let xhtml = null;
        xhtml = data.map((item, index) => {
            return (
                <Card key={index} style={{ marginBottom: "4%" }}>
                    <CardHeader
                        title={index + 1}
                        action={
                            <Tooltip title={t("DeleteCard")}>
                                <IconButton onClick={() => onDeleteCard(index)}>
                                    <DeleteIcon style={{ fontSize: 25 }} />
                                </IconButton>
                            </Tooltip>
                        }
                    />
                    <Divider />
                    <CardContent>
                        <Grid container spacing={5} style={{ padding: 0 }}>
                            <Grid item xs={12} lg={6}>
                                <Box m={3}>
                                    <TextField
                                        value={item.text}
                                        name="text"
                                        required
                                        style={{ margin: "1%" }}
                                        fullWidth
                                        id="standard-textarea"
                                        label="Tu moi"
                                        multiline
                                        margin="normal"
                                        onChange={(e) => onChange(e, index)}
                                        // onKeyDown={e => this.props.onPress(e, index)}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Box m={3}>
                                    <TextField
                                        name="vocabulary_meaning"
                                        value={item.vocabulary_meaning}
                                        required
                                        style={{ margin: "1%" }}
                                        fullWidth
                                        id="standard-textarea"
                                        label="Nghia cua tu"
                                        multiline
                                        margin="normal"
                                        onChange={(e) => onChange(e, index)}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Box m={3}>
                                    <TextField
                                        value={item.kanji_text}
                                        name="kanji_text"
                                        required
                                        style={{ margin: "1%" }}
                                        fullWidth
                                        id="standard-textarea"
                                        label="chu kanji"
                                        multiline
                                        margin="normal"
                                        onChange={(e) => onChange(e, index)}
                                        // onKeyDown={e => this.props.onPress(e, index)}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Box m={3}>
                                    <TextField
                                        name="kanji_meaning"
                                        value={item.kanji_meaning}
                                        required
                                        style={{ margin: "1%" }}
                                        fullWidth
                                        id="standard-textarea"
                                        label="Nghia kanji"
                                        multiline
                                        margin="normal"
                                        onChange={(e) => onChange(e, index)}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            );
        });
        return xhtml;
    };
    return (
        <React.Fragment>
            <div className="add-course-container">
                <form onSubmit={onHandleSubmit}>
                    <Box ml={8}>
                        <TextField
                            required
                            id="standard-multiline-flexible"
                            name="CourseName"
                            label="Ten chu de hoc"
                            value={array.title}
                            onChange={handleChange}
                            rowsMax="4"
                            className="add-course-container__text-field"
                            margin="normal"
                        />
                    </Box>
                    <Box m={8}>
                        {renderCard(array.voca)}
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={onAddNewCard}
                            disabled={circularRedux}
                        >
                            <Grid container spacing={5}>
                                <Grid item xs={12}>
                                    Tao mot the moi
                                </Grid>
                            </Grid>
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            className="add-course-container__button"
                            type="submit"
                        >
                            {circularRedux ? (
                                <CircularProgress color="#ffffff" size={25} />
                            ) : (
                                "Tao Chu de hoc"
                            )}
                        </Button>
                    </Box>
                </form>
            </div>
        </React.Fragment>
    );
};

export default withRouter(withSnackbar(CreateTopic));
