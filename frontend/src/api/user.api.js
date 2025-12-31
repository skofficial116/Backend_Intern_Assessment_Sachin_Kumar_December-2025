import api from "./axios";

export const fetchUsers = async (page = 1) => {
  const res = await api.get(`/users?page=${page}`);
  return res.data;
};

export const activateUser = async (id) => {
  const res = await api.patch(`/users/${id}/activate`);
  return res.data;
};

export const deactivateUser = async (id) => {
  const res = await api.patch(`/users/${id}/deactivate`);
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await api.put("/users/profile", data);
  return res.data;
};

export const changePassword = async (data) => {
  const res = await api.put("/users/change-password", data);
  return res.data;
};

export const requestAdminAccess = async (data) => {
  const res = await api.post("/users/request-admin", data);
  return res.data;
};
