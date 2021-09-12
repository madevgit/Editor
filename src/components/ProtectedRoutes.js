import Publish from "../pages/editor/index";
import { Route, Switch, useHistory } from "react-router-dom";
import ProfilPage from "../pages/profil";
import Menu from "./menu";
import Published from "../pages/published";
import Saved from "../pages/saved";
import { useDataContext } from "./dataContext";
import { useAuthContext } from "./AuthContext";
import { useEffect, useState } from "react";

export default function ProtectedRoute() {
  const { Setter } = useDataContext();
  const History = useHistory();
  useEffect(() => {
    Setter.readLastPost().then((data) => {
      if (data && data[0]) {
        History.replace(`/home/edit/${data[0]._id}`);
      }
    });
  }, []);

  return (
    <div className="relative">
      <Menu />
      <Switch>
        <Route exact path="/home/edit/:postId?">
          <Publish />
        </Route>
        <Route exact path="/home/published">
          <Published />
        </Route>
        <Route exact path="/home/account">
          <ProfilPage />
        </Route>
        <Route exact path="/home/saved">
          <Saved />
        </Route>
      </Switch>
    </div>
  );
}
