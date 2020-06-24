import * as reportConstants from "constants/ReportUsers";
import findIndex from "lodash/findIndex";

const reducer = (
    state = {
        reports: [],
        reportDetail: {},
    },
    action
) => {
    switch (action.type) {
        case reportConstants.GET_ALL_REPORT_USERS_SUCCESS: {
            const {payload} = action;
            console.log(payload);
            return {
                ...state,
                reports: payload,
            };
        }
        // case AlphabetConstants.GET_ALPHABET_DETAILS_SUCCESS: {
        //     const {payload} = action;
        //     return {
        //         ...state,
        //         alphabetDetail: payload,
        //     };
        // }
        default:
            return {...state};
    }
};

export default reducer;
