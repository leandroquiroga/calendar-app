import { types } from "../types/types";

interface initialState{
  checking: true,
};

export const authReducer = (state: initialState, action: any) => {
  
  switch (action.type) {
    
    case types.authLogin:
      return {
        ...state,
        checking: false,
        ...action.payload
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