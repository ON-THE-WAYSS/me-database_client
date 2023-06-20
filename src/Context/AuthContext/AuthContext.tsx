import React, { useState, useContext, useReducer, useEffect } from 'react';
import reducer from '../../Reducers/AuthReducer/AuthReducer';
import {
  AUTH_USER_FAILED,
  AUTH_USER_SUCCESS,
} from '../../utils/Helpers/Constant';
import fetcher from '../../utils/Helpers/Fetcher/fetchApi';
import { IContextType } from '../../utils/Type/contextType';

const initialState: IContextType = {
  user: {},
  token: '',
};

const AuthContext = React.createContext(initialState);
const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth');
    if (token) {
      (async () => {
        setLoading(true);
        try {
          const data = await fetcher.post({
            url: '/api/v1/user/token',
            body: { token },
            token,
          });

          if (data.success) {
            dispatch({
              type: AUTH_USER_SUCCESS,
              payload: { data: data.data, token },
            });
          } else {
            dispatch({ type: AUTH_USER_FAILED });
          }
          setLoading(false);
        } catch (error) {
          dispatch({ type: AUTH_USER_FAILED });
          setLoading(false);
        }
      })();
    } else {
      dispatch({ type: AUTH_USER_FAILED });
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthContextProvider, useAuthContext };
