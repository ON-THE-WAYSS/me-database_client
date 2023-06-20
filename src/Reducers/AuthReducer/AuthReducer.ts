import {
  AUTH_USER_FAILED,
  AUTH_USER_SUCCESS,
} from '../../utils/Helpers/Constant';

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case AUTH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
        token: action.payload.token,
      };
    case AUTH_USER_FAILED:
      localStorage.removeItem('auth');
      return { ...state, user: {} };

    default:
      throw new Error(`No matching action type - ${action.type}`);
  }
};

export default reducer;
