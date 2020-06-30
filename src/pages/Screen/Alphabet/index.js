import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { withSnackbar } from "notistack";
import { withRouter } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Tabs } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Table, Input, Button, Space } from "antd";

import "./styles.scss";
import * as alphabetActions from "actions/Alphabet";
import MyModal from "pages/Components/MyModal";
import UpdateAlpabet from "./Components/UpdateAlphabet";
const { TabPane } = Tabs;

const Alphabet = (props) => {
    // -----    DEFINE  -----
    const modalRef = useRef(null);
    const columns = [
        {
            title: "Id",
            dataIndex: "_id",
            key: "_id",
            width: "20%",
        },
        {
            title: "Romaji",
            dataIndex: "romaji",
            key: "romaji",
            align: "center",
        },
        {
            title: "Hiragana",
            dataIndex: "hira",
            key: "hira",
            align: "center",
        },
        {
            title: "Katakana",
            dataIndex: "kata",
            key: "kata",
            align: "center",
        },
        {
            title: "Action",
            key: "action",
            render: (item) => (
                <Space size="middle">
                    <a onClick={() => _updateAlphabet(item._id)}>Update</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];
    const dispatch = useDispatch();
    const alphabetRedux = useSelector((state) => state.Alphabet.alphabet);
    // -----    STATE   -----
    const [isLoading, setIsLoading] = useState(true);
    // -----    USEEFFECT   -----
    useEffect(() => {
        // _getAllAlphabet();
        if (alphabetRedux.length === 0) {
            dispatch(alphabetActions.Get_All_Alphabet_Request(setIsLoading));
        } else {
            setIsLoading(false);
        }
    }, []);
    // -----    FUNC    -----
    const _updateAlphabet = (id) => {
        console.log(modalRef);
        if (modalRef.current !== null) {
            modalRef.current._openModal(
                <UpdateAlpabet
                    _closeModal={modalRef.current._closeModal}
                    id={id}
                />,
                1000
            );
        }
    };
    const _renderAlphabet = (data) => {
        if (data.length === 0) {
            return <div>Khong co bang chu cai</div>;
        } else {
            return data.map((item, index) => {
                return;
            });
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
    return (
        <div>
            <div>
                <Button
                // onClick={() => {
                //     _showModalCreate();
                // }}
                >
                    Tạo chữ cái mới
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={alphabetRedux ? alphabetRedux : ""}
            />
            <MyModal ref={modalRef} />
        </div>
    );
};

export default withRouter(withSnackbar(Alphabet));
