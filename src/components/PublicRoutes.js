import { Route, Redirect } from "react-router-dom";

export default function PublicRoute({ children, authStatus, ...rest }) {

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !authStatus ? children : <Redirect to={{ pathname: "/home/edit" }} />
      }
    />
  );
}
