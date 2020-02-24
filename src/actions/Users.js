import * as UsersConstants from "../constants/Users";

export const get_users_details = () => {
  return {
    type: UsersConstants.GET_USERS_DETAILS,
    payload: null
  };
};
