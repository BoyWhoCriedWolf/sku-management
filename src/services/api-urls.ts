export const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? // ? "http://localhost:8000/api"
      "https://sku-management-api.onrender.com"
    : "https://sku-management-api.onrender.com";

export const API_URLS = {
  // contacts
  CONTACT_CREATE: "/contact/create",
  CONTACT_UPDATE: "/contact/update",
  CONTACT_DELETE: "/contact/delete",
  CONTACT_GETS: "/contact/list",
  CONTACT_GET: "/contact/get",
};
