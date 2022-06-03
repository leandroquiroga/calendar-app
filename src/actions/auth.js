import { fetchNotToken, fetchWithToken } from "../helpers/fetchAPI"
import { types } from "../types/types";

const login = (user) => ({
  type: types.authLogin,
  payload: user
});

const checkingFinish = () => ({ type: types.authChekingFinish });

const logout = () => ({ type: types.authLogout });

const eventLogout = () => ({ type: types.eventLogout });

export const authStartLogin = (email, password, setMsgError) => {
  return async (dispatch) => {
    const response = await fetchNotToken('auth/login', { email, password }, 'POST');
    const body = await response.json();

    // En caso de que haya un error en el login retorna el mensaje de error.
    if (!body.ok) return setMsgError(body.msg);

    localStorage.setItem('token', body.token);
    localStorage.setItem('token-init-date', new Date().getTime());
    dispatch(login({
      uid: body.uid,
      name: body.name
    }));
  }
} 

export const startRegister = (email, password, name, setMsgError) => {
  return async (dispatch) => {
    const response = await fetchNotToken('auth/register', { email, password, name }, 'POST');
    const body = await response.json();

    // En caso de que haya un error en el registro retornara un mensaje de error 
    if (!body.ok) return setMsgError(body.msg);

    localStorage.setItem('token', body.token);
    localStorage.setItem('token-init-date', new Date().getTime());
    dispatch(login({
      uid: body.uid,
      name: body.name,
    }));
  };
}


export const startCheking = () => {
  return async (dispatch) => {
    const response = await fetchWithToken('auth/renew');
    const body = await response.json();

    if (!body.ok) {
      // Cambia el checking a true y retorna un mensaje de error desde el backend
      return dispatch(checkingFinish());
    };

    localStorage.setItem('token', body.token);
    localStorage.setItem('token-init-date', new Date().getTime());

    dispatch(login({
      uid: body.uid,
      name: body.name,
    }));
  };
};


export const startUserLogut = () => {
  return (dispatch) => {
    // Debe eliminar el token
    localStorage.removeItem('token');
    localStorage.removeItem('token-init-date');

    dispatch(eventLogout())
    dispatch(logout());
  }
};