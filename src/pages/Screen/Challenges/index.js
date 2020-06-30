import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { withSnackbar } from "notistack";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./styles.scss";
import * as challengesActions from "actions/Challenges";
import MyModal from "pages/Components/MyModal";
import UpdateChallenges from "./Components/UpdateChallenges";
import CreateChallenges from "./Components/CreateChallenges";
import DeleteChallenges from "./Components/DeleteChallenges";

const Challenges = (props) => {
    // -----    DEFINE  -----
    const modalRef = useRef(null);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = props;
    const challengesRedux = useSelector((state) => state.Challenges.challenges);

    // -----    STATE   -----
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    // -----    USEEFFECT   -----
    useEffect(() => {
        if (challengesRedux.length === 0) {
            dispatch(
                challengesActions.Get_All_Challenges_Request(
                    setIsLoading,
                    enqueueSnackbar
                )
            );
        } else {
            setIsLoading(false);
        }
    }, []);

    // -----    FUNC    -----
    const _showModalDetail = (item) => {
        console.log("Hello");
        modalRef.current._openModal(
            <UpdateChallenges
                item={item}
                setIsLoading={setIsLoading}
                _closeModal={modalRef.current._closeModal}
                enqueueSnackbar={enqueueSnackbar}
            />,
            1000
        );
    };
    const _showModalCreate = () => {
        console.log("Hello");
        modalRef.current._openModal(
            <CreateChallenges
                setIsLoading={setIsLoading}
                _closeModal={modalRef.current._closeModal}
            />,
            1000
        );
    };
    const _showModalDelete = (item) => {
        console.log("Hello");
        modalRef.current._openModal(
            <DeleteChallenges
                item={item}
                setIsLoading={setIsLoading}
                _closeModal={modalRef.current._closeModal}
            />,
            1000
        );
    };
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={(node) => {
                        console.log(node);
                        console.log(props);
                        // props.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{ width: 188, marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{ color: filtered ? "#1890ff" : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => console.log(props));
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: "Câu hỏi",
            dataIndex: "question",
            key: "question",
            width: "30%",
            ...getColumnSearchProps("question"),
        },
        {
            title: "Lựa chọn 1",
            dataIndex: "choice_1",
            key: "choice_1",
            align: "center",
        },
        {
            title: "Lựa chọn 2",
            dataIndex: "choice_2",
            key: "choice_2",
            align: "center",
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
            align: "center",
            render: (item) => (
                <Space size="middle">
                    {moment(item.createdAt).format("LLL")}
                </Space>
            ),
        },
        {
            title: "Action",
            key: "action",
            align: "center",
            render: (item) => (
                <Space size="middle">
                    <a
                        onClick={() => _showModalDetail(item)}
                        style={{ color: "green" }}
                    >
                        Chỉnh sửa thử thách
                    </a>
                    <a
                        onClick={() => _showModalDelete(item)}
                        style={{ color: "red" }}
                    >
                        Xoá thử thách này
                    </a>
                </Space>
            ),
        },
    ];
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
                    onClick={() => {
                        _showModalCreate();
                    }}
                >
                    Tạo thử thách mới
                </Button>
            </div>
            <Table
                dataSource={challengesRedux ? challengesRedux : ""}
                columns={columns}
            />
            <MyModal ref={modalRef} />
        </div>
    );
};

export default withRouter(withSnackbar(Challenges));
