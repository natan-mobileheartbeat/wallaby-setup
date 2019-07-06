import React from 'react';
import { shallow } from 'enzyme';
import BreadCrums from './BreadCrums';


describe('BreadCrums tests', () => {
  it('should render bread crums', () => {
    const crums = ['first', 'second', 'third'];
    const wrapper = shallow(<BreadCrums crums={crums} />);
    expect(wrapper).toBeTruthy();
    expect(wrapper.find('span').length).toEqual(5);
  });
});
