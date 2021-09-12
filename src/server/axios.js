import axios from "axios";
const api = false;
const baseUrl = api
  ? `https://blogeditorapi.herokuapp.com`
  : `http://localhost:8080`;
const server = {
  login: async (data) => {
    return await axios
      .post(`${baseUrl}/login`, data)
      .then((response) => response)
      .catch((reason) => reason);
  },
  register: async (data) => {
    return await axios
      .post(`${baseUrl}/register`, data)
      .then((response) => response)
      .catch((reason) => reason);
  },
  logout: async (data) => {
    return await axios
      .get(`${baseUrl}/logout`)
      .then((response) => response)
      .catch((reason) => reason);
  },
  updateAccount: async (userId, Credential, data) => {
    return await axios
      .put(`${baseUrl}/account`, data, {
        params: { userId, Credential },
      })
      .then((response) => response)
      .catch((reason) => reason);
  },
  readPosts: async (id, skip, limit, published) => {
    return await axios
      .get(`${baseUrl}/posts`, {
        params: {
          id,
          limit,
          published,
          skip,
        },
      })
      .then((response) => response)
      .catch((reason) => reason);
  },
  readPost: async (idPost, idUser = undefined) => {
    return await axios
      .get(`${baseUrl}/post`, {
        params: { idPost, idUser },
      })
      .then((response) => response)
      .catch((reason) => reason);
  },
  createPosts: async (id, data) => {
    return await axios
      .post(`${baseUrl}/posts`, data, {
        params: {
          id,
        },
      })
      .then((response) => response)
      .catch((reason) => reason);
  },
  updatePost: async (data, id) => {
    return await axios
      .put(`${baseUrl}/post`, data, {
        params: {
          id,
        },
      })
      .then((response) => response)
      .catch((reason) => reason);
  },
  deletePost: async (idUser, idPost) => {
    return await axios
      .delete(`${baseUrl}/post`, {
        params: {
          idUser,
          idPost,
        },
      })
      .then((response) => response)
      .catch((reason) => reason);
  },
};

export default server;
