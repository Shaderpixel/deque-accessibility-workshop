import React from 'react';
import PropTypes from 'prop-types';
import { TopBar, Main, SkipLink, MenuItem, Layout, Icon } from 'cauldron-react';
import logo from '../../img/icons/logo.svg';
import './index.css';
import Stats from '../Stats';
import Recipes from '../Recipes';

const App = props => (
  // console.log(props) || (
  <div className="App">
    <SkipLink target={'#main-content'} />
    <TopBar role="banner">
      <MenuItem>
        <img alt="" role="presentation" src={logo} />
        <span>awesome recipes</span>
      </MenuItem>
    </TopBar>
    <Layout>
      <Main id="main-content" aria-labelledby="main-heading" tabIndex={-1}>
        <div className="App__head">
          <div className="confined">
            <h1 id="main-heading">Recipe Dashboard</h1>
          </div>
        </div>
        <Stats stats={props.stats} />
        <Recipes recipes={props.recipes} />
        <button
          type="button"
          className="Edit"
          aria-label="Edit {recipe}"
          onClick={() =>
            alert('TODO: Build the accessible edit recipe modal! Good luck!')
          }
        >
          <Icon type="fa-pencil" />
        </button>
      </Main>
    </Layout>
  </div>
);

App.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  stats: PropTypes.arrayOf(PropTypes.object).isRequired,
  modalState: PropTypes.shape({
    edit: PropTypes.bool,
    view: PropTypes.bool
  })
};

App.displayName = 'App';
export default App;
