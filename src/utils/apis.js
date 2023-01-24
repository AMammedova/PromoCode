import axios from "axios";

const Promocode = axios.create({
  baseURL: "https://promocodepanelapi.inloya.com/api/Promocode",
  headers: {
    "Content-type": "application/json",
  },
});

const Logins = axios.create({
  baseURL: "https://promocodepanelapi.inloya.com/api/User",
  headers: {
    "Content-type": "application/json",
    Authorization:
      "Bearer RwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQXlzZWwiLCJqdGkiOiIyYThmODc5MS00MjAwLTRhZDgtOGY3Ny1jYjMyNWI3MjZjZDQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsIm5iZiI6MTY3NDU1NjU2NiwiZXhwIjoxNjc0NTYyNTY2LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUxMjkiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjcxMjEifQ.ijXbWfBJim8BLSxgkWQZS6nBOK9IMedgvhSBojVWbMohW7gyieNV4yNNY7b4cij5pXQxgqLEZJN0T5_lN-TqfA",
  },
});

const Merchant = axios.create({
  baseURL: "https://promocodepanelapi.inloya.com/api/Merchant",
  headers: {
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
    const res = await Logins.post("/Login", {
      userName: "Aysel",
      password: "123",
    });
    return res;
  },
};
