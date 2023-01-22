import axios from "axios";

const instance = axios.create({
  baseURL: "/api/Promocode",
});

const instanceLogin = axios.create({
  baseURL: "/api/User",
});

export const Apis = {
  getAll: async () => {
    const { data } = await instance.get("/All");
    return data;
  },
  addRandom: async () => {
    const { data } = await instance.post("/addRandom");
    return data;
  },
  addCostum: async () => {
    const { data } = await instance.post("/addCostum");
    return data;
  },
  activatePromocode: async () => {
    const { data } = await instance.post("/Activate");
    return data;
  },
  usePromocode: async () => {
    const { data } = await instance.post("/Use");
    return data;
  },
  register: async () => {
    const { data } = await instance.post("/Register");
    return data;
  },
  login: async () => {
    const { data } = await instance.post("/Login");
    return data;
  },
};
