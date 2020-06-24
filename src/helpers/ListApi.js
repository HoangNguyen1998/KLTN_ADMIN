import callApi from "./ApiCaller";

export const _getData = async (url) => {
    const res = await callApi(url, "GET", null);
    return res.data;
};

export const _postData = async (url, data) => {
    try {
        console.log(data);
        const res = await callApi(url, "POST", data);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const _puttData = async (url, data) => {
    try {
        console.log(data);
        const res = await callApi(url, "PUT", data);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const _deleteData = async (url) => {
    try {
        const res = await callApi(url, "DELETE", null);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
};
