import * as SignInConstants from "constants/SignIn";
import * as callApi from "helpers/ListApi";

export const SignIn_Error = (error) => {
    return {
        type: SignInConstants.SIGNIN_ERROR,
        payload: { error },
    };
};
export const SignIn_Success = (success, remember) => {
  return {
      type: SignInConstants.SIGNIN_SUCCESS,
      payload: { success, remember },
  };
};
export const SignIn_Request = (data, history, enqueueSnackbar, t) => async (
    dispatch
) => {
    const res = await callApi._postData("users/login", data);
    console.log(res);
    if (res.code === 403) {
        dispatch(SignIn_Error(res.message));
        enqueueSnackbar(res.message, { 
            variant: 'error',
        });
    }
    if (res.code === 200) {
        console.log("hello")
        dispatch(SignIn_Success(res.result, false))
        history.push('/')
    }
    // return {
    //     type: SignInConstants.SIGNIN_REQUEST,
    //     payload: { data, history, enqueueSnackbar, t },
    // };
};

