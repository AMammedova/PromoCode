import axios from "axios";

const token = import.meta.env.VITE_TOKEN;

const Promocode = axios.create({
  baseURL: "https://promocodepanelapi.inloya.com/api/Promocode",
  headers: {
    Authorization: `Bearer ${token}`,

    "Content-type": "application/json",
  },
});

const Logins = axios.create({
  baseURL: "https://promocodepanelapi.inloya.com/api/Users",
  headers: {
    Authorization: `Bearer ${token}`,

    "Content-type": "application/json",
  },
});

const Merchant = axios.create({
  baseURL: "https://promocodepanelapi.inloya.com/api/Merchant",
  headers: {
    Authorization: `Bearer ${token}`,

    "Content-type": "application/json",
  },
});

export const Apis = {
  getAllMerchant: async () => {
    const { data } = await Merchant.get("/All");
    return data;
  },
  editMerchant: async () => {
    const { data } = await Merchant.get("/Edit");
    return data;
  },
  deleteMerchant: async () => {
    const { data } = await Merchant.get("/Delete");
    return data;
  },
  getAllPromocode: async () => {
    const { data } = await Promocode.get("/All");
    console.log(data);
    return data;
  },
  addRandom: async () => {
    const { data } = await Promocode.post("/addRandom");
    return data;
  },
  addCostum: async () => {
    const { data } = await Promocode.post("/addCostum");
    return data;
  },
  activatePromocode: async () => {
    const { data } = await Promocode.post("/Activate");
    return data;
  },
  usePromocode: async () => {
    const { data } = await Promocode.post("/Use");
    return data;
  },
  register: async () => {
    const { data } = await Logins.post("/Register");
    return data;
  },
  login: async (login) => {
    const { data } = await Logins.post("/Login", login);
    return data;
  },
};
