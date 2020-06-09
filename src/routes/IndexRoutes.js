import React from "react";
import Users from "pages/Screen/Users";

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
];

export default routes;
