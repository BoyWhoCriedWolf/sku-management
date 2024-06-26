export const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? // ? "http://localhost:8000/api"
      "https://sku-management-api.onrender.com"
    : "https://sku-management-api.onrender.com";

export const API_URLS = {
  // skus
  SKU_CREATE: "/skus",
  SKU_UPDATE: "/skus",
  SKU_DELETE: "/skus",
  SKU_GETS: "/skus",
  SKU_GET: "/skus",
};
