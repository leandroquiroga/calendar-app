import { types } from "../types/types";
interface CheckingAuth {
  checking: boolean
}

const initialState: CheckingAuth = {
  checking: true,
};

export const authReducer = (state = initialState, action: any) => {
  
  const { payload, type } = action;

  switch (type) {
    
    case types.authLogin:
      return {
        ...state,
        checking: false,
        ...payload,
      };
    
    case types.authChekingFinish:
      return {
        ...state,
        checking: false,
      };
    
    case types.authLogout:
      return {
        checking: false,
      };

    default:
      return state;
  };
};