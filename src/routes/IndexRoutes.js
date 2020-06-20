import React from "react";
import CheckAuthen from "helpers/GetToken";
import Users from "pages/Screen/Users";
import Signin from "pages/Screen/SignIn";
import Topic from "pages/Screen/Topic";
import Alphabet from "pages/Screen/Alphabet";
import ReportUser from 'pages/Screen/ReportUser'
const routes = [
    // {
    //     path: "/draw",
    //     exact: false,
    //     main: () => (CheckAuthen() ? <Draw /> : <SignIn />),
    // },
    {
        path: "/Alphabet",
        exact: false,
        main: () => (CheckAuthen() ? <Alphabet /> : <Signin />),
    },
    {
        path: "/Users",
        exact: false,
        main: () => (CheckAuthen() ? <Users /> : <Signin />),
    },  
    {
        path: "/Topics",
        exact: false,
        main: () => (CheckAuthen() ? <Topic /> : <Signin />),
    },
    {
        path: "/Reports",
        exact: false,
        main: () => (CheckAuthen() ? <ReportUser /> : <Signin />),
    },
];

export default routes;
