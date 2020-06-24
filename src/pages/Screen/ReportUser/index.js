import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { withSnackbar } from "notistack";
import { withRouter } from "react-router-dom";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";

import "./styles.scss";
import * as reportActions from "actions/ReportUsers";
import MyModal from "pages/Components/MyModal";
import ReportDetail from "./Components/ReportDetail";

const ReportUser = (props) => {
    // -----    DEFINE  -----
    const modalRef = useRef(null);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = props;
    const reportUsersRedux = useSelector((state) => state.ReportUsers.reports);
    // -----    STATE   -----
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");

    // -----    USEEFFECT   -----
    useEffect(() => {
        dispatch(reportActions.Get_All_Report_Users_Request(setIsLoading));
    }, []);

    // -----    FUNC    -----
    const _showModal = (item) => {
        modalRef.current._openModal(
            <ReportDetail
                item={item}
                _closeModal={modalRef.current._closeModal}
            />,
            600
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
            title: "Id",
            dataIndex: "_id",
            key: "_id",
            width: "20%",
        },
        {
            title: "Nội dung",
            dataIndex: "content",
            key: "content",
            align: "center",
            ...getColumnSearchProps("content"),
        },
        {
            title: "Id bình luận",
            dataIndex: "commentId",
            key: "commentId",
            align: "center",
        },
        {
            title: " Ngày tạo",
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
                        onClick={() => _showModal(item)}
                        style={{ color: "red" }}
                    >
                        Xem
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
            <Table
                columns={columns}
                dataSource={reportUsersRedux ? reportUsersRedux : ""}
            />
            <MyModal ref={modalRef} />
        </div>
    );
};

export default withRouter(withSnackbar(ReportUser));
