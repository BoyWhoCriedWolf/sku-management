import { AxiosError } from "axios";
import { apiClient } from "utils/api-utils";
import { API_URLS } from "./api-urls";
import { APIService } from "./api.service";
import { Sku as Sku } from "./types/sku.types";
import { APIResponseType } from "./types/response.types";

class SkuService extends APIService<Sku> {
  async gets(): Promise<APIResponseType<Sku[]>> {
    try {
      const data = await apiClient.get(API_URLS.CONTACT_GETS);
      return data as APIResponseType<Sku[]>;
    } catch (error) {
      const axiosError = error as AxiosError<APIResponseType>;
      return {
        success: false,
        code: axiosError.response?.status,
        msg: axiosError.response?.data?.msg ?? "Network Connection Problem",
        data: [],
      } as APIResponseType;
    }
  }

  async get({ id = "" }: { id: string }): Promise<APIResponseType<Sku>> {
    try {
      const data = await apiClient.get(`${API_URLS.CONTACT_GET}/${id}`);
      return data as APIResponseType<Sku>;
    } catch (error) {
      const axiosError = error as AxiosError<APIResponseType>;
      return {
        success: false,
        code: axiosError.response?.status,
        msg: axiosError.response?.data?.msg ?? "Network Connection Problem",
      } as APIResponseType;
    }
  }

  async save({ data }: { data?: Sku }): Promise<APIResponseType<Sku>> {
    try {
      const ret =
        data?.id === "new" || !data?.id
          ? await apiClient.post(API_URLS.CONTACT_CREATE, data)
          : await apiClient.put(`${API_URLS.CONTACT_UPDATE}/${data?.id}`, data);
      return ret as APIResponseType<Sku>;
    } catch (error) {
      const axiosError = error as AxiosError<APIResponseType>;
      return {
        success: false,
        code: axiosError.response?.status,
        msg: axiosError.response?.data?.msg ?? "Network Connection Problem",
      } as APIResponseType;
    }
  }

  async delete({
    id = "",
  }: {
    id?: string;
  }): Promise<APIResponseType<boolean>> {
    try {
      const ret = await apiClient.delete(`${API_URLS.CONTACT_DELETE}/${id}`);
      return ret as APIResponseType<boolean>;
    } catch (error) {
      const axiosError = error as AxiosError<APIResponseType>;
      return {
        success: false,
        code: axiosError.response?.status,
        msg: axiosError.response?.data?.msg ?? "Network Connection Problem",
      } as APIResponseType;
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new SkuService();
