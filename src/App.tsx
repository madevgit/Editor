import ProtectedRoute from "./components/ProtectedRoutes";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoutes";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import { useAuthContext } from "./components/AuthContext";
import DataProvider from "./components/dataContext";
import { Route, Switch } from "react-router";
import { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const [Online, setOnline] = useState(true);

  const {
    Authentication: { status },
  } = useAuthContext();

  useEffect(() => {
    document.addEventListener("online", (e) => {
      setOnline(true);
    });
    document.addEventListener("offline", (e) => {
      setOnline(false);
    });
  }, []);

  return (
    <>
      {Online && (
        <div>
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
        </div>
      )}
      {!Online && (
        <div className="relative h-screen">
          <h2 className="absolute transform -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2">
            You are offline !
          </h2>
        </div>
      )}
    </>
  );
}
