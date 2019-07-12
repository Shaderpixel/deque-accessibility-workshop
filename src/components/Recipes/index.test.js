import React from 'react';
import { shallow } from 'enzyme';
import Recipes from './index';
import { testRecipe, defaultModalState } from '../../../test-utils/testUtils';

describe('<Recipe />', () => {
  it('marks each recipe image as presentational or has null alt', () => {
    const wrapper = shallow(
      <Recipes recipes={testRecipe} modalState={defaultModalState} />
    );
    const presentationImage = wrapper
      .find('.Recipes__card-head img')
      .map(node => {
        return (
          node.prop('alt') === '' || node.prop('aria-role') === 'presentation'
        );
      });
    expect(presentationImage).toHaveLength(1);
  });
});
