export interface TypesRedux {
  uiOpenModal: string ;
  uiCloseModal: string ;
  eventStartAddNew: string ;
  eventAddNew: string ;
  eventSetActive: string ;
  eventUpdateNotes: string ;
  clearActiveEvent: string ;
  eventDeleteNotes: string ;
  eventLoaded: string ;
  eventLogout: string ;
  authChekingFinish: string ;
  authStartLogin: string ;
  authLogin: string ;
  authStartRegister: string ;
  authStartTokenRenew: string ;
  authLogout: string ;
}


// Objeto que mantiene centralizado todos los tipos de la acciones
export const types: TypesRedux = {
  uiOpenModal: "[ui] Open modal",
  uiCloseModal: "[ui] Close modal",

  eventStartAddNew: "[event] Start add new",
  eventAddNew: "[event] Add new",
  eventSetActive: "[event] Set active",
  eventUpdateNotes: "[event] Updated notes",
  clearActiveEvent: "[event] Clear notes",
  eventDeleteNotes: "[event] Delete notes",
  eventLoaded: "[event] Loaded notes",
  eventLogout: "[event] Logout notes",

  authChekingFinish: "[auth] Finish checking state",
  authStartLogin: "[auth] Start login",
  authLogin: "[auth] Login",
  authStartRegister: "[auth] Start register",
  authStartTokenRenew: "[auth] Start token renew",
  authLogout: "[auth] Logout",
};

export default types;