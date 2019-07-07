import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import AppContainer from './App';

describe('the ancestor <App /> container', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppContainer />, div);
  });

  it('has no child component', () => {
    const wrapper = shallow(<AppContainer />);
    expect(wrapper.children()).toHaveLength(0);
  });
  it('returns the App component', () => {
    const wrapper = shallow(<AppContainer />);
    expect(wrapper.find('App')).toHaveLength(1);
    expect(wrapper.find('App').exists()).toBe(true);
  });
});
