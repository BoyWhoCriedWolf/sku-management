import { APIResponseType } from "./types/response.types";

const MOCKUP_DELAY = 1000;

export class APIService<T = any> {
  async gets(p?: any): Promise<APIResponseType<T[]>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          success: false,
          msg: "Backend is in development",
        });
      }, MOCKUP_DELAY);
    });
  }

  async get({ id = "" }: { id?: string }): Promise<APIResponseType<T>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          success: false,
          msg: "Backend is in development",
        });
      }, MOCKUP_DELAY);
    });
  }

  async save({
    data,
  }: {
    data?: T;
  }): Promise<APIResponseType<T>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          success: false,
          msg: "Backend is in development",
        });
      }, MOCKUP_DELAY);
    });
  }

  async saves({
    data = [],
  }: {
    data?: Array<T>;
  }): Promise<APIResponseType<Array<string | boolean>>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          success: false,
          msg: "Backend is in development",
        });
      }, MOCKUP_DELAY);
    });
  }

  async delete({ id = "" }: { id?: string }): Promise<APIResponseType<boolean>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          success: false,
          msg: "Backend is in development",
        });
      }, MOCKUP_DELAY);
    });
  }

  async deletes({
    ids = [],
  }: {
    ids?: Array<string>;
  }): Promise<APIResponseType<null>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          success: false,
          msg: "Backend is in development",
        });
      }, MOCKUP_DELAY);
    });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new APIService();
