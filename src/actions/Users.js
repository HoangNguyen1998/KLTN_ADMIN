import * as usersContants from "constants/Users";
import * as listApi from "helpers/ListApi";

export const Get_All_Users_Request = (setIsLoading) => async (dispatch) => {
    const res = await listApi._getData("users");
    dispatch(Get_All_Users_Success(res.result));
    setIsLoading(false);
};

export const Block_User_Request = (
    enqueueSnackbar,
    setIsLoading,
    _closeModal,
    id
) => async (dispatch) => {
    const res = await listApi._puttData(`users/${id}/block`, null);
    if (res.code === 200) {
        setIsLoading(false);
        _closeModal();
        enqueueSnackbar("Khoa tai khoan thanh cong", { variant: "success" });
        const res = await listApi._getData("users");
        dispatch(Get_All_Users_Success(res.result));
    } else {
        setIsLoading(false);
        enqueueSnackbar("Khoa tai khoan that bai", { variant: "error" });
    }
};

export const Get_All_Users_Success = (success) => {
    return {
        type: usersContants.GET_ALL_USER_SUCCESS,
        payload: success,
    };
};

// export const Update_Alphabet_Detail_Request = (
//     _closeModal,
//     enqueueSnackbar,
//     setIsLoading,
//     id,
//     data
// ) => async (dispatch) => {
//     const res = await listApi._puttData(`alphabet/${id}`, data);
//     if (res.code === 200) {
//         const res = await listApi._getData("/alphabet");
//         dispatch(Get_All_Alphabet_Success(res.result));
//         _closeModal()
//         enqueueSnackbar("Sua thanh cong", {
//             variant: "success",
//         });
//     } else {
//         enqueueSnackbar("Sua that bai", {
//             variant: "error",
//         });
//     }
//     setIsLoading(false);
// };
