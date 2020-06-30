import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";

import MyModal from "pages/Components/MyModal";
import "./styles.scss";
import * as topicsActions from "actions/Topics";
import CreateTopicModal from "./Components/CreateTopic";
const Topic = (props) => {
    // -----    DEFINE  -----
    const topicsRedux = useSelector((state) => state.Topics.topics);
    const modalRef = useRef(null);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = props;

    // -----    STATE   -----
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");

    // -----    USEEFFECT   -----
    useEffect(() => {
        if (topicsRedux.length === 0) {
            dispatch(
                topicsActions.Get_Topics_Request(setIsLoading, enqueueSnackbar)
            );
        } else {
            setIsLoading(false);
        }
    }, []);
    // -----    FUNC    -----
    const _showModalCreate = () => {
        modalRef.current._openModal(<CreateTopicModal setIsLoading={setIsLoading} />, 1000);
    };
    const _showModalDetail = () => {
        console.log("hello");
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
            title: "Id",
            dataIndex: "_id",
            key: "_id",
            width: "20%",
        },
        {
            title: "Chủ đề",
            dataIndex: "title",
            key: "title",
            align: "center",
            ...getColumnSearchProps("title"),
        },
        {
            title: "Số thứ tự",
            dataIndex: "number",
            key: "number",
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
                        onClick={() => _showModalDetail(item._id, item.status)}
                        style={{ color: "green" }}
                    >
                        Chỉnh sửa chủ đề học
                    </a>
                    <a
                        onClick={() => _showModalDetail(item._id, item.status)}
                        style={{ color: "red" }}
                    >
                        Xoá chủ đề học
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
                    Tạo chủ đề học mới
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={topicsRedux ? topicsRedux : ""}
            />
            <MyModal ref={modalRef} />
        </div>
    );
};

export default withRouter(withSnackbar(Topic));
