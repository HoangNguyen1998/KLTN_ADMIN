import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { withSnackbar } from "notistack";
import { withRouter } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import CircularProgress from "@material-ui/core/CircularProgress";

import "../styles.scss";

const ChallengesDetail = (props) => {
    // -----    DEFINE  -----
    const dispatch = useDispatch ()
    const {item, _closeModal}=props

    // -----    STATE   -----
    const [isLoading, setIsLoading] =useState(true)
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    
    // -----    USEEFFECT   -----

    // -----    FUNC    -----
    
    // -----    RENDER  -----
    return <div>HELLO</div>;
};

export default withRouter(withSnackbar(ChallengesDetail));
