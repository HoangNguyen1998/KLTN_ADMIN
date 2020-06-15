import React from "react";
import Users from "pages/Screen/Users";
import Topic from "pages/Screen/Topic"
const routes = [
    // {
    //     path: "/draw",
    //     exact: false,
    //     main: () => (CheckAuthen() ? <Draw /> : <SignIn />),
    // },
    {
        path: "/Users",
        exact: false,
        main: () => <Users />,
    },
    {
        path: "/Topic",
        exact: false,
        main: () => <Topic />
    },
];

export default routes;
