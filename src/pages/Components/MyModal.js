import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from "react";
import {
    Row,
    Col,
    Divider,
    List,
    Button,
    Radio,
    Modal,
    Input,
    Table,
    Form,
    Tooltip,
} from "antd";

const MyModal = forwardRef((props, ref) => {
    const [isShowModal, setIsShowModal] = useState(false);
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);
    const [view, setView] = useState(null);
    useImperativeHandle(ref, () => ({
        _openModal(view, width) {
            if (width) {
                setWidth(width);
            }
            setIsShowModal(true);
            setView(view);
        },
        _closeModal() {
            setIsShowModal(false);
            setWidth(null);
        },
    }));
    const _closeModal = () => {
        setIsShowModal(false);
        setWidth(null);
    };
    return (
        <Modal
            width = {width}
            zIndex={1000000000000000000000000000}
            ref={ref}
            onCancel={_closeModal}
            centered
            visible={isShowModal}
            footer={null}
        >
            {view}
        </Modal>
    );
});

export default MyModal;
