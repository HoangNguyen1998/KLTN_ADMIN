import SignIn from "../views/SignIn";

const routes = [
  {
    path: "/signin",
    exact: false,
    main: () => SignIn
  },
  {
    path: "/users",
    exact: false,
    main: () => SignIn
  },
  {
    path: "/signin",
    exact: false,
    main: () => SignIn
  },
  {
    path: "/",
    exact: false,
    main: () => SignIn
  }
];

export const routes
