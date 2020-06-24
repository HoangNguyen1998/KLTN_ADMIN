import * as ChallengesConstants from "constants/Challenges";
import * as　listApi from 'helpers/ListApi'
import * as noti from "helpers/Notistack";

export const Get_All_Challenges_Request = (setIsLoading, enqueueSnackbar) => async (dispatch)=> {
    const res = await listApi._getData("challenges");
    if (res.code === 200) {
        noti.Noti_Success(enqueueSnackbar, "Tai thanh cong");
        dispatch(Get_All_Challenges_Success(res.result));
    } else {
        noti.Noti_Error(enqueueSnackbar, "Co loi, xin vui long tai lai");
    }
    setIsLoading(false)
};

export const Get_All_Challenges_Error = (errors) => {
    return {
        type: ChallengesConstants.GET_ALL_CHALLENGES_ERROR,
        payload: errors,
    };
};

export const Get_All_Challenges_Success = (data) => {
    return {
        type: ChallengesConstants.GET_ALL_CHALLENGES_SUCCESS,
        payload: data,
    };
};

export const Get_Challenge_Details_Request = (id, setIsWaiting) => {
    return {
        type: ChallengesConstants.GET_CHALLENGE_DETAILS_REQUEST,
        payload: {id, setIsWaiting},
    };
};
export const Get_Challenge_Details_Success = (success) => {
    return {
        type: ChallengesConstants.GET_CHALLENGE_DETAILS_SUCCESS,
        payload: success,
    };
};
export const Get_Challenge_Details_Error = (error) => {
    return {
        type: ChallengesConstants.GET_CHALLENGE_DETAILS_ERROR,
        payload: error,
    };
};

export const Get_Comments = (comments) => {
    return {type: ChallengesConstants.GET_COMMENTS_SUCCESS, payload: comments};
};
