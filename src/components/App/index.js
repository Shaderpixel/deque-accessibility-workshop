import React from 'react';
import PropTypes from 'prop-types';
import { Main, SkipLink, Layout, Icon } from 'cauldron-react';
import logo from '../../img/icons/logo.svg';
import './index.css';
import Stats from '../Stats';
import Recipes from '../Recipes';

const App = ({
  recipes,
  stats,
  modalState,
  updateRecipe,
  updateModalState
}) => (
  <div className="App">
    {!modalState.edit && !modalState.view && (
      <SkipLink target={'#main-content'} />
    )}
    <div className="dqpl-top-bar" role="banner">
      <ul role="menubar">
        <li
          tabIndex={!modalState.view && !modalState.edit ? 0 : -1}
          role="menuitem"
        >
          <img alt="" role="presentation" src={logo} />
          <span>awesome recipes</span>
        </li>
      </ul>
    </div>
    <Layout>
      <Main id="main-content" aria-labelledby="main-heading" tabIndex={-1}>
        <div className="App__head">
          <div className="confined">
            <h1 id="main-heading">Recipe Dashboard</h1>
          </div>
        </div>
        <Stats stats={stats} />
        <Recipes
          recipes={recipes}
          modalState={modalState}
          updateRecipe={updateRecipe}
          updateModalState={updateModalState}
        />
      </Main>
    </Layout>
  </div>
);

App.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  stats: PropTypes.arrayOf(PropTypes.object).isRequired,
  modalState: PropTypes.shape({
    edit: PropTypes.string,
    view: PropTypes.string
  }),
  updateRecipe: PropTypes.func.isRequired,
  updateModalState: PropTypes.func.isRequired
};

App.displayName = 'App';
export default App;
