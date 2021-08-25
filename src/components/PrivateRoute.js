import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ children, authStatus, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authStatus ? children : <Redirect to={{ pathname: "/" }} />
      }
    />
  );
}
