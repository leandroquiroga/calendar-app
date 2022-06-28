import React from 'react'
import { mount } from "enzyme";
import { PageNotFound } from "../../../components/pageNotFound/PageNotFound";
import { Route, Routes, MemoryRouter} from 'react-router-dom';
import '@testing-library/jest-dom';
import '../../../setupTest';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));


describe('Test on componet </PageNotFound>', () => {

  const wapper = mount(
    <MemoryRouter initialEntries={['/*']}>
      <Routes>
        <Route path='/*' element={
          <PageNotFound />
        }/>
      </Routes >
    </MemoryRouter>
  );    

  test('this test should make a snapshot correctly', () => {
    expect(wapper).toMatchSnapshot();
  });

  test('this test should return to previus page', () => {
    wapper.find('button').prop('onClick')();

    expect(mockNavigate).toHaveBeenCalledWith("/", {"replace": true});
  });
});