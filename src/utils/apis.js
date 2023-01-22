import axios from "axios";

const instance = axios.create({
  baseURL: "/api/Promocode",
});

export const Apis = {
  getAll: async () => {
    const { data } = instance.get("/All");
    return data;
  },
  addRandom: async () => {
    const { data } = instance.post("/addRandom");
    return data;
  },
};
