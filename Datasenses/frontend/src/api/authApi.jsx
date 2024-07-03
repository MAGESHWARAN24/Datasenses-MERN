import axios from "axios";
const baseURL = "http://localhost:4000/";

export const authApi = (path) => {
  return {
    post: async (data) =>
      await axios.post(`${baseURL}${path}`, data, {withCredentials: true}),
  };
};
