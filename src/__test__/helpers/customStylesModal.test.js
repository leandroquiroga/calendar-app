import { customStylesModal } from "../../helpers/customStylesModal";


describe('Test on customStylesModal.js', () => {
  const customStylesModalMoked = jest.mocked(customStylesModal);
  
  test('this test should showcorrectly', () => {
    expect(customStylesModalMoked).toEqual(customStylesModal)
  });

  test('this test should contain the property top with value of 50%', () => {
    expect(customStylesModalMoked.content.top).toEqual('50%');
  });

  test('this test should contain the property transform', () => {
    expect(customStylesModalMoked.content).toHaveProperty('transform');
  });
});