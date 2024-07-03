import axios from "axios";

const baseURL = "http://localhost:4000/";

export default async function applicationAPI(path) {
  const URL = `${baseURL}${path}`;
  return {
    fetch: async () => await axios.get(URL, {withCredentials: true}),
    fetchAll: async () => axios.get(URL, {withCredentials: true}),
    get: async () => axios.get(URL, {withCredentials: true}),
    post: async (data) => await axios.post(URL, data, {withCredentials: true}),
    put: async (data) => await axios.put(URL, data, {withCredentials: true}),
    patch: async (data) =>
      await axios.patch(URL, data, {withCredentials: true}),
  };
}

export const apiPath = {
  form: {
    get: "forms",
    getFormElement: "forms/builder/",
    create: "forms",
    save: "forms/builder/",
    publish: "forms/builder/",
  },
  submit: {
    get: "submit/",
    post: "submit/",
  },
  repository: {
    fetch: "repository/",
  },
};
