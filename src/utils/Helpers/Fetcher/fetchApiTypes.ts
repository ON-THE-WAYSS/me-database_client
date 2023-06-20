export interface IFetcherParamsData {
  url: string;
  body: any;
  token?: string;
}

export interface IFetcher {
  get: (url: string, token?: string) => any;
  post: (postData: IFetcherParamsData) => any;
}

export interface IPostParams {
  url: string;
  body: any;
}
