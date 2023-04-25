import { types } from '../types/types';

interface UIState {
  modalOpen: boolean;
}

const initialState: UIState = { modalOpen: false };

export const uiReducer = (state = initialState, action: any) => {

  switch (action.type) {
    case types.uiOpenModal:
      return {
        ...state,
        modalOpen: true,
      };
    
    case types.uiCloseModal:
      return {
        ...state,
        modalOpen: false
      };
  
    default:
      return state;
  };
};