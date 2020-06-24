import * as topicsConstants from "constants/Topics";
import * as listApi from "helpers/ListApi";
import * as noti from "helpers/Notistack";
export const Get_Topics_Request = (setIsLoading, enqueueSnackbar) => async (
    dispatch
) => {
    const res = await listApi._getData("topics");
    console.log(res.data);
    if (res.code === 200) {
        noti.Noti_Success(enqueueSnackbar, "Tai thanh cong");
        dispatch(Get_Topics_Success(res.result));
    } else {
        noti.Noti_Error(enqueueSnackbar, "Co loi, xin vui long tai lai");
    }
    setIsLoading(false)
};

export const Get_Topics_Success = (success) => {
    return {
        type: topicsConstants.GET_TOPICS_SUCCESS,
        payload: success,
    };
};

export const getTopicsError = (error) => {
    return {
        type: topicsConstants.GET_TOPICS_ERROR,
        payload: error,
    };
};

//Lay thong tin chi tiet cua mot topic
export const gettopicdetailsRequest = (id) => {
    return {
        type: topicsConstants.GET_TOPIC_DETAILS_REQUEST,
        payload: id,
    };
};
export const gettopicdetailsSuccess = (success) => {
    return {
        type: topicsConstants.GET_TOPIC_DETAILS_SUCCESS,
        payload: success,
    };
};
export const gettopicdetailsError = (error) => {
    return {
        type: topicsConstants.GET_TOPIC_DETAILS_ERROR,
        payload: error,
    };
};
