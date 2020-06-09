import SignIn from "../views/SignIn";
import Users from '../components/manager/Users'
import Challenges from '../components/manager/Challenges'

const routes = [
  {
    path: "/Challenges",
    exact: false,
    main: () => Challenges
  },
  {
    path: "/Users",
    exact: false,
    main: () => Users
  },
  {
    path: "/",
    exact: false,
    main: () => SignIn
  }
];

export default routes
