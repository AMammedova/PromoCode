import axios from "axios";

// const token = import.meta.env.VITE_TOKEN;
let Promocode,Merchant

Promocode = axios.create({
  baseURL: "https://promocodepanelapi.inloya.com/api/Promocode",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("user-token")}`,

    "Content-type": "application/json",
  }});

  Merchant = axios.create({
    baseURL: "https://promocodepanelapi.inloya.com/api/Merchant",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("user-token")}`,
  
      "Content-type": "application/json",
    },
  })

export const setToken = (token) => {
  Promocode = axios.create({
  baseURL: "https://promocodepanelapi.inloya.com/api/Promocode",
  headers: {
    Authorization: `Bearer ${token}`,

    "Content-type": "application/json",
  }});

  Merchant = axios.create({
    baseURL: "https://promocodepanelapi.inloya.com/api/Merchant",
    headers: {
      Authorization: `Bearer ${token}`,
  
      "Content-type": "application/json",
    },
  })
}

const Logins = axios.create({
  baseURL: "https://promocodepanelapi.inloya.com/api/Users",
  headers: {
    "Content-type": "application/json",
  },
});


export const Apis = {
  getAllMerchant: async () => {
    const { data } = await Merchant.get("/All");
    return data;
  },
  editMerchant: async (editMerchant) => {
    const { data } = await Merchant.post("/Edit",editMerchant);
    return data;
  },
  deleteMerchant: async (merchantId) => {
    const { data } = await Merchant.post(`/Delete?merchantId=${merchantId}`);
    return data;
  },
  getAllPromocode: async () => {
    const { data } = await Promocode.get("/All");

    return data;
  },
  getAllPromocodeCount: async () => {
    const { data } = await Promocode.get("/GetPromocodeCounts");

    return data;
  },
  addRandom: async (random,count) => {
    const { data } = await Promocode.post(`/AddRandom?count=${count}`,random);
    return data;
  },
  getExcelPromocodes: async (id) => {
    const { data } = await Promocode.get(`/GetExcelPromocodes?id=${id}`,
    
    );
    return data;
  },
  addCostum: async (custom) => {
    const { data } = await Promocode.post("/AddCustom",custom);
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
  register: async (register) => {
    const { data } = await Logins.post("/Register",register);
    return data;
  },
  filter: async (filter) => {
    const { data } = await Promocode.post("/Filter", filter);
    return data;
  },
  login: async (login) => {
    const { data } = await Logins.post("/Login", login);
    return data;
  },
};
