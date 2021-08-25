import ProtectedRoute from "./components/ProtectedRoutes";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoutes";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import { useAuthContext } from "./components/AuthContext";
import DataProvider from "./components/dataContext";
import { Route, Switch } from "react-router";
export default function App() {
  const {
    Authentication: { status },
  } = useAuthContext();
  return (
    <>
      <PublicRoute path="/" authStatus={status}>
        <Switch>
          <Route path="/" exact>
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
        </Switch>
      </PublicRoute>
      <PrivateRoute path="/home" authStatus={status}>
        <DataProvider>
          <ProtectedRoute />
        </DataProvider>
      </PrivateRoute>
    </>
  );
}
