import { uiCloseModal, uiOpenModal } from "../../actions/actions";
import { uiReducer } from "../../reducer/uiReducer";

const initiState = {
  modalOpen: false
}

describe('Test on uiReducer.js', () => {

  test('this test should return state by default', () => {
    const state = uiReducer(initiState, {});

    expect(state).toEqual(initiState)
  });

  test('this test should open the modal', () => {
    const modalOpen = uiOpenModal();
    const state = uiReducer(initiState, modalOpen);

    expect(state).toEqual({ modalOpen: true });
  });

  test('this test should close the modal', () => {
    const modalClose = uiCloseModal();
    const state = uiReducer(initiState, modalClose);

    expect(state).toEqual({ modalOpen: false });
  });
});