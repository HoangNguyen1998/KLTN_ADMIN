import * as UsersConstants from "../constants/Users";

const reducer = (
  state = [
    { id: 1, name: "Nguyen Viet Hoang", age: 22 },
    { id: 2, name: "Hua Van Lam", age: 22 },
    { id: 3, name: "Nguyen Van Hung", age: 22 }
  ],
  action
) => {
  switch (action.type) {
    case UsersConstants.GET_USERS_DETAILS:
      return [...state, { id: 4, name: "Tran Van Viet", age: 22 }];
    default:
      return [...state];
  }
};

export default reducer;
