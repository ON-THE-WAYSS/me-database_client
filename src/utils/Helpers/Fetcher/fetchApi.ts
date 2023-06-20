import { IFetcher, IFetcherParamsData } from './fetchApiTypes';
import { BaseUrl } from '../Constant';
import axios from 'axios';

// fetch object for fetch data
const fetcher: IFetcher = {
  // get data fetcher
  get: async (url: string, token?: string) => {
    try {
      const { data } = await axios.get(`${BaseUrl}${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (err: any) {
      if (err?.response) {
        return err?.response?.data;
      } else {
        return {
          success: false,
          message: 'Something went wrong',
        };
      }
    }
  },

  // post data fetcher
  post: async ({ url, body, token }: IFetcherParamsData) => {
    try {
      const { data } = await axios.post(`${BaseUrl}${url}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (err: any) {
      if (err?.response) {
        return err?.response?.data;
      } else {
        return {
          success: false,
          message: 'Something went wrong',
        };
      }
    }
  },
};

export default fetcher;
