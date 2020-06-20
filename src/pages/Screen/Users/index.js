import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { withSnackbar } from "notistack";
import { withRouter } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Tabs } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";

import "./styles.scss";
import * as usersActions from "actions/Users";
import MyModal from "pages/Components/MyModal";
import BlockUser from "./Components/BlockUser";
const { TabPane } = Tabs;

const Users = (props) => {
    // -----    DEFINE  -----
    const modalRef = useRef(null);

    const dispatch = useDispatch();
    const usersRedux = useSelector((state) => state.Users.users);

    // -----    STATE   -----
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");

    // -----    USEEFFECT   -----
    useEffect(() => {
        dispatch(usersActions.Get_All_Users_Request(setIsLoading));
    }, []);

    // -----    FUNC    -----
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
                        console.log(node)
                        console.log(props)
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
    const _showModalBlock = (id, status) => {
        modalRef.current._openModal(
            <BlockUser
                _closeModal={modalRef.current._closeModal}
                id={id}
                status={status}
            />
        );
    };

    const columns = [
        {
            title: "Id",
            dataIndex: "_id",
            key: "_id",
            width: "20%",
        },
        {
            title: "Tên",
            dataIndex: "username",
            key: "username",
            align: "center",
            ...getColumnSearchProps("username"),
        },
        {
            title: "Bạn bè",
            dataIndex: "friends",
            key: "friends",
            align: "center",
            render: (item) => (
                <Space size="middle">
                    <div>{item.length}</div>
                </Space>
            ),
        },
        {
            title: "Khoá học",
            dataIndex: "courses",
            key: "courses",
            align: "center",
            render: (item) => (
                <Space size="middle">
                    <div>{item.length}</div>
                </Space>
            ),
        },
        {
            title: "Action",
            key: "action",
            align: "center",
            render: (item) => (
                <Space size="middle">
                    {item.status === "active" ? (
                        <a
                            onClick={() =>
                                _showModalBlock(item._id, item.status)
                            }
                            style={{ color: "red" }}
                        >
                            Khoá tài khoản
                        </a>
                    ) : (
                        <a
                            onClick={() =>
                                _showModalBlock(item._id, item.status)
                            }
                            style={{ color: "green" }}
                        >
                            Mở khoá tài khoản
                        </a>
                    )}
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
            <Table
                columns={columns}
                dataSource={usersRedux ? usersRedux : ""}
            />
            <MyModal ref={modalRef} />
        </div>
    );
};

export default withRouter(withSnackbar(Users));
