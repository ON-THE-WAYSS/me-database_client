import axios from 'axios';
import { BaseUrl } from '../Helpers/Constant';
export default axios.create({
  baseURL: BaseUrl,
});
