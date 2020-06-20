import * as AlphabetConstants from "constants/Alphabet";
import * as listApi from "helpers/ListApi";

export const Get_All_Alphabet_Request = (setIsLoading) => async (dispatch) => {
    const res = await listApi._getData("/alphabet");
    dispatch(Get_All_Alphabet_Success(res.result));
    setIsLoading(false);
};

export const Get_All_Alphabet_Error = (errors) => {
    return {
        type: AlphabetConstants.GET_ALL_ALPHABET_ERROR,
        payload: errors,
    };
};

export const Get_All_Alphabet_Success = (success) => {
    return {
        type: AlphabetConstants.GET_ALL_ALPHABET_SUCCESS,
        payload: success,
    };
};

export const Get_Alphabet_Detail_Request = (setIsLoading, id) => async (
    dispatch
) => {
    const res = await listApi._getData(`alphabet/${id}`);
    setIsLoading(false);
    console.log(res.result);
    dispatch(Get_Alphabet_Detail_Success(res.result));
};

export const Get_Alphabet_Detail_Error = (errors) => {
    return {
        type: AlphabetConstants.GET_ALPHABET_DETAILS_ERROR,
        payload: errors,
    };
};

export const Get_Alphabet_Detail_Success = (success) => {
    return {
        type: AlphabetConstants.GET_ALPHABET_DETAILS_SUCCESS,
        payload: success,
    };
};

export const Update_Alphabet_Detail_Request = (
    _closeModal,
    enqueueSnackbar,
    setIsLoading,
    id,
    data
) => async (dispatch) => {
    const res = await listApi._puttData(`alphabet/${id}`, data);
    if (res.code === 200) {
        const res = await listApi._getData("/alphabet");
        dispatch(Get_All_Alphabet_Success(res.result));
        _closeModal()
        enqueueSnackbar("Sua thanh cong", {
            variant: "success",
        });
    } else {
        enqueueSnackbar("Sua that bai", {
            variant: "error",
        });
    }
    setIsLoading(false);
};
