import { Dispatch, SetStateAction } from "react";

import { AppDispatch } from "../store/store";
import { fetchNotToken, fetchWithToken } from "../helpers/fetchAPI"
import { types } from "../types/types";

export interface UserProps {
  email?: string;
  password?: string;
  name: string;
  uid: string;
};

export interface UserLogin {
  email: string;
  password: string;
  setMsgError: Dispatch<SetStateAction<string>>
};

export interface UserRegister {
  email: string;
  password: string;
  name?: string;
  setMsgError: Dispatch<SetStateAction<string>>
};

const login = (user: UserProps) => ({
  type: types.authLogin,
  payload: user
});

const checkingFinish = () => ({ type: types.authChekingFinish });

const logout = () => ({ type: types.authLogout });

const eventLogout = () => ({ type: types.eventLogout });

export const authStartLogin = (
  email: string,
  password: string,
  setMsgError: Dispatch<SetStateAction<string>>
): any => {
  return async (dispatch: AppDispatch) => {
    const response = await fetchNotToken(
      "auth/login",
      { email, password },
      "POST"
    );
    const body = await response.data;

    // En caso de que haya un error en el login retorna el mensaje de error.
    if (!body.ok) return setMsgError(body.msg);

    localStorage.setItem("token", body.token);
    localStorage.setItem("token-init-date", new Date().getTime().toString());
    dispatch(
      login({
        uid: body.uid,
        name: body.name,
      })
    );
  };
}; 

export const startRegister = (
  email: string,
  password: string,
  name: string,
  setMsgError: Dispatch<SetStateAction<string>>,
): any => {
  return async (dispatch: AppDispatch) => {
    const response = await fetchNotToken(
      "auth/register",
      { email, password, name },
      "POST"
    );
    const body = await response.data;

    // En caso de que haya un error en el registro retornara un mensaje de error
    if (!body.ok) return setMsgError(body.msg);

    localStorage.setItem("token", body.token);
    localStorage.setItem("token-init-date", new Date().getTime().toString());
    dispatch(
      login({
        uid: body.uid,
        name: body.name,
      })
    );
  };
};

// Buscar una mejor definicion para el tipo de retorno de la funcion
export const startCheking = (): any => {
  return async (dispatch: AppDispatch) => {
    const response = await fetchWithToken("auth/renew", "GET");
    const body = await response.data;
    if (!body.ok) {
      // Cambia el checking a true y retorna un mensaje de error desde el backend
      return dispatch(checkingFinish());
    }

    localStorage.setItem("token", body.token);
    localStorage.setItem("token-init-date", new Date().getTime().toString());

    dispatch(
      login({
        uid: body.uid,
        name: body.name,
      })
    );
  };
};

// Buscar una mejor definicion para el tipo de retorno de la funcion
export const startUserLogut = ():any => {
  return (dispatch: AppDispatch) => {
    // Debe eliminar el token
    localStorage.removeItem("token");
    localStorage.removeItem("token-init-date");

    dispatch(eventLogout());
    dispatch(logout());
  };
};