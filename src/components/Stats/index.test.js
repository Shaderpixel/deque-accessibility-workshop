import React from 'react';
import { shallow } from 'enzyme';
// import toJson from 'enzyme-to-json';
import Stats from './';
import { fakeStats } from '../../../test-utils/testUtils';

const statsWrapper = shallow(<Stats stats={fakeStats} />);

describe('<Stats/>', () => {
  it('have three images', () => {
    // const wrapper = shallow(<Stats stats={fakeStats} />);
    expect(statsWrapper.find('.Stat__value-icon')).toHaveLength(3);
  });
  it('marks each icon as decorative or have a null alt', () => {
    // const wrapper = shallow(<Stats stats={fakeStats} />);
    const presentationalImages = statsWrapper
      .find('.Stat__value-icon')
      .map(node => {
        return node.prop('alt') === '' || node.prop('role') === 'presentation';
      });
    expect(presentationalImages).toHaveLength(3);

    presentationalImages.forEach(value => expect(value).toBeTruthy());
  });

  it('marks each stat region with proper aria attriburtes', () => {
    statsWrapper.find('h2').forEach(node => {
      expect(node.prop('aria-live')).toEqual('polite');
      expect(node.prop('aria-relevant')).toEqual('all');
      expect(node.prop('aria-atomic')).toEqual('true');
    });
  });
});
