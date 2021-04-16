import React from 'react'
import { Route, Redirect } from "react-router-dom";


const RouterGuard = ({ component: Component, auth, redirect = "/admin", ...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            auth === true
                ? <Redirect to={redirect} />
                : <Component {...props} />
        )} />
    )
}

export default RouterGuard