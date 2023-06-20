export interface IMeList {
  id: number;
  name: string;
  address: string;
  photo: string;
  occupation: string;
  district_name: string;
}

export interface ISingleMeProduct {
  id: number;
  name: string;
  category_name: string;
  me_name: string;
}

export interface ISingleME {
  id: number;
  name: string;
  address: string | null;
  nid_number: string | null;
  date_of_birth: string;
  gender: string;
  father_name: string | null;
  mother_name: string | null;
  maritial_status: string;
  partner_name: string | null;
  phone: string;
  email: string | null;
  religion: string;
  occupation: string;
  business_name: string | null;
  business_type: string | null;
  trade_license: string | null;
  business_start_date: string | null;
  business_details: string | null;
  ecommerce_connection: string | null;
  ecommerce_link: string | null;
  photo: string | null;
  nid_front: string | null;
  nid_back: string | null;
  ngo_status: string | null;
  membership_no: string | null;
  ngo_connection_via: string | null;
  blood: string;
  created_at: string;
  area_id: number;
  area_name: string;
  sub_district_name: string;
  district_name: string;
  division_name: string;
  created_by_id: number;
  created_by_name: string;
  ngo_id: number;
  ngo_name: string;
  field_office_id: number;
  field_office_name: string;
  product: ISingleMeProduct[];
}

export interface IFieldOffice {
  id: number;
  name: string;
  address: string;
  image: string;
  area_name: string;
  sub_district_name: string;
  district_name: string;
  division_name: string;
  ngo_id: number;
  ngo_name: string;
}

export interface ISingleNgo {
  id: number;
  name: string;
  image: string;
  address: string;
  user_id: string;
  user_name: string;
  phone: string;
  status: string;
  area_name: string;
  sub_district_name: string;
  district_name: string;
  division_name: string;
  fieldOffice: IFieldOffice[];
}

export interface ISingleFieldOffice {
  id: number;
  name: string;
  image: string;
  address: string;
  user_id: number;
  user_name: string;
  phone: string;
  status: number;
  email: string;
  area_name: string;
  sub_district_name: string;
  district_name: string;
  division_name: string;
}
