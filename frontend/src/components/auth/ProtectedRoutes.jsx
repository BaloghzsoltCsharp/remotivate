import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ children, }) => {
    const isProtected = localStorage.getItem('token');
    if(!isProtected){
        return <Navigate to="/login" replace/>
    }

    return children ? children : <Outlet/>;
}

export default ProtectedRoutes

// import { Route } from 'react-router-dom';
//
// const ProtectedRoutes = ({
//                           component: Component,
//                           ...rest
//                       }) => {
//     const isAuth = localStorage.getItem('isLoggedIn');
//     return (
//         <Route
//             {...rest}
//             render={props =>
//                 isAuth ? (
//                     <Component {...props} {...rest} />
//                 ) : (
//                     <Navigate
//                         to={{
//                             pathname: "/admin/login",
//                             state: {
//                                 from: props.location
//                             }
//                         }}
//                     />
//                 )
//             }
//         />
//     );
// }
//
// export default ProtectedRoutes