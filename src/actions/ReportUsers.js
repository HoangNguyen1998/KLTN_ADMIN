import * as reportContants from "constants/ReportUsers";
import * as listApi from "helpers/ListApi";

export const Get_All_Report_Users_Request = (setIsLoading) => async (dispatch) => {
    const res = await listApi._getData("reportUser");
    console.log(res.result)
    dispatch(Get_All_Report_Users_Success(res.result));
    setIsLoading(false);
};

export const Get_All_Report_Users_Success = data => {
    return {
        type: reportContants.GET_ALL_REPORT_USERS_SUCCESS,
        payload: data
    }
};


