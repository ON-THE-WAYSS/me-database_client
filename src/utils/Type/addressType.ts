export interface IResponse {
  success: boolean;
  message: string;
  data?: any;
  type?: string;
  status?: number;
}

export interface IDistrictList {
  district_id: number;
  district_name: string;
  division_id: number;
  division_name: string;
}

export interface IDistrict extends IResponse {
  data?: IDistrictList[];
}
export interface IDivisionList {
  division_id: number;
  division_name: string;
}

export interface IDivision extends IResponse {
  data?: IDivisionList[];
}
export interface IThanaList {
  thana_id: number;
  thana_name: string;
  district_id: number;
  district_name: string;
  division_id: number;
  division_name: string;
}

export interface IThana extends IResponse {
  data?: IThanaList[];
}
export interface IAreaList {
  area_id: number;
  area_name: string;
  thana_id: number;
  thana_name: string;
  district_id: number;
  district_name: string;
  division_id: number;
  division_name: string;
}

export interface IArea extends IResponse {
  data?: IAreaList[];
}
