import { IPostParams } from '../Helpers/Fetcher/fetchApiTypes';
import { AxiosInstance } from 'axios';
import api from './api';

class jwtService {
  alreadyFetchingAccessToken = false;
  private axios: AxiosInstance = api;

  constructor() {
    // request
    api.interceptors.request.use(
      (config) => {
        const accessToken = this.getAccessToken();
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  // get access token
  public getAccessToken = () => {
    return localStorage.getItem('a_t');
  };

  // set access token
  public setAccessToken = (value: string) => {
    return localStorage.setItem('a_t', value);
  };

  // get refresh token
  public getRefreshToken = () => {
    return localStorage.getItem('r_t');
  };

  // set refresh token
  public setRefreshToken = (value: string) => {
    return localStorage.setItem('r_t', value);
  };

  // get request
  public async get(uri: string) {
    try {
      const { data } = await this.axios.get(uri);
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
  }

  // post request
  public async post({ url, body }: IPostParams) {
    try {
      const { data } = await this.axios.post(url, body);
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
  }
}

export default jwtService;
