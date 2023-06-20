import fetcher from '../../utils/Helpers/Fetcher/fetchApi';

type IGetIDProps = {
  token: string;
  divisionId?: string | null;
  districtId?: string | null;
  areaId?: string | null;
};

export const fetchFilterApi = async ({
  token,
  divisionId,
  districtId,
  areaId,
}: IGetIDProps): Promise<any[] | undefined> => {
  try {
    const urls = [
      `/api/v1/category`,
      `/api/v1/ngo`,
      `/api/v1/field-office`,
      `/api/v1/address/division`,
      `/api/v1/address/district?division=${divisionId}`,
      `/api/v1/address/thana?district=${districtId}`,
      `/api/v1/address/area?sub_district=${areaId}`,
    ];
    const responses = await Promise.all(
      urls.map((url) => fetcher.get(url, token))
    );
    const data = await Promise.all(responses.map((response) => response));
    return data;
  } catch (error) {
    console.error(error);
  }
};
