import { types } from "../../types/types";

describe('Test in Types.js', () => {
  test('This test must be equal a object', () => {
    expect(types).toEqual({
      uiOpenModal: '[ui] Open modal',
      uiCloseModal: '[ui] Close modal',
    
      eventStartAddNew: '[event] Start add new',
      eventAddNew: '[event] Add new',
      eventSetActive: '[event] Set active',
      eventUpdateNotes: '[event] Updated notes',
      clearActiveEvent: '[event] Clear notes',
      eventDeleteNotes: '[event] Delete notes',
      eventLoaded: '[event] Loaded notes',
      eventLogout: '[event] Logout notes',
    
      authChekingFinish: '[auth] Finish checking state',
      authStartLogin: '[auth] Start login',
      authLogin: '[auth] Login',
      authStartRegister: '[auth] Start register',
      authStartTokenRenew: '[auth] Start token renew',
      authLogout: '[auth] Logout',
    });
  });

  test('This test must retunt a capture of the object', () => {
    expect(types).toMatchSnapshot()
  });
});