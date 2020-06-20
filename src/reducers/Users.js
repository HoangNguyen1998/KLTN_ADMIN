import * as usersConstants from "constants/Users";
import findIndex from "lodash/findIndex";

const reducer = (
    state = {
        users: [],
        alphabetDetail: {},
    },
    action
) => {
    switch (action.type) {
        case usersConstants.GET_ALL_USER_SUCCESS: {
            const { payload } = action;
            console.log(payload);
            return {
                ...state,
                users: payload,
            };
        }
        default:
            return { ...state };
    }
};

export default reducer;
