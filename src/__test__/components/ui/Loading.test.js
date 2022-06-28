import React from "react";
import { shallow } from "enzyme";
import { Loading } from "../../../components/ui/Loading";

import '@testing-library/jest-dom';
import '../../../setupTest';


describe('Test on <Loading />', () => {

  test('this test should make a snapshot with <Loading /> correctly', () => {
    const wapper = shallow(<Loading />);

    expect(wapper).toMatchSnapshot();
  });
});