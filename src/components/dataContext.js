import React, { useContext, useEffect, useState } from "react";
import server from "../server/axios";
import { useAuthContext } from "./AuthContext";
import { useNotificatContext } from "./NotificatorContext";

const DataContext = React.createContext();

export default function DataProvider({ children }) {
  const { Authentication } = useAuthContext();
  const [Refresh, setRefresh] = useState(true);
  const LunchNotification = useNotificatContext();

  useEffect(() => [Refresh]);

  const Setter = {
    posts: async (skip, limit, published) => {
      let response = await server.readPosts(
        Authentication.user._id,
        skip,
        limit,
        published
      );
      if (response.statusText === "OK" && response.status === 200) {
        return {
          items: response.data.posts,
          number: response.data.number,
        };
      } else {
        console.log(response.response);
      }
    },
    savePost: async (data, published) => {
      data.published = published;
      let response = await server.createPosts(Authentication.user._id, data);
      if (response.statusText === "OK" && response.status === 200) {
        LunchNotification(true, response.data.message);
        setRefresh((prev) => !prev);
      } else {
        LunchNotification(false, response.response.data.reason);
      }
    },
    readLastPost: async () => {
      let response = await server.readPost(undefined, Authentication.user._id);
      if (response.data) return response.data.post;
    },
    readPost: async (idPost) => {
      let response = await server.readPost(idPost);
      if (response.statusText === "OK" && response.status === 200) {
        return response.data.post;
      } else {
        LunchNotification(false, response.response.data.reason);
        console.log(response.response);
      }
    },
    updatePost: async (data) => {
      let response = await server.updatePost(data, data._id);
      if (response.statusText === "OK" && response.status === 200) {
        LunchNotification(true, response.data.message);
        setRefresh((prev) => !prev);
      } else {
        LunchNotification(false, response.response.data.reason);
        console.log(response.response);
      }
    },
    deletePost: async (idPost) => {
      let comfirm = window.confirm("Comfirm to remove the post");
      if (comfirm) {
        let response = await server.deletePost(Authentication.user._id, idPost);
        if (response.statusText === "OK" && response.status === 200) {
          LunchNotification(true, response.data.message);
          setRefresh((prev) => !prev);
        } else {
          LunchNotification(false, response.response.data.reason);
          console.log(response.response);
        }
      }
    },
  };
  return (
    <DataContext.Provider value={{ Setter }}>{children}</DataContext.Provider>
  );
}

export function useDataContext() {
  return useContext(DataContext);
}
