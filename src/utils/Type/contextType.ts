import React from 'react';

export interface IUserType {
  user_id?: number;
  user_name?: string;
  email?: string;
  name?: string;
  status?: number;
  type?: string;
  ngo_id?: number;
  field_office_id?: number;
  address?: string;
  area_name?: string;
  thana_name?: string;
  district_name?: string;
  division_name?: string;
  image?: String;
}
export interface IContextType {
  user: IUserType;
  token: string;
  dispatch?: React.Dispatch<any>;
  loading?: boolean;
  setLoading?: (value: boolean) => void;
}
