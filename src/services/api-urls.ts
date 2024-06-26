export const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? // ? "http://localhost:8000/api"
      "https://sku-management-api.onrender.com"
    : "https://sku-management-api.onrender.com";

export const API_URLS = {
  // skus
  SKU_CREATE: "/sku/create",
  SKU_UPDATE: "/sku/update",
  SKU_DELETE: "/sku/delete",
  SKU_GETS: "/sku/list",
  SKU_GET: "/sku/get",
};
