import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getEmailLayout = () => axios.get(`${API_URL}/getEmailLayout`);
export const uploadImage = (formData) =>
  axios.post(`${API_URL}/uploadImage`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const uploadEmailConfig = (data) => axios.post(`${API_URL}/uploadEmailConfig`, data);
export const renderAndDownloadTemplate = (data) =>
  axios.post(`${API_URL}/renderAndDownloadTemplate`, data, { responseType: "blob" });
