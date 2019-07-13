import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from 'cauldron-react';
import RecipeModal from '../../containers/RecipeModal';
import './index.css';
// TODO implement RecipeModal
const Recipes = ({
  recipes,
  modalState: { edit, view } // multi level destructuring
}) => {
  return (
    <div className="Recipes">
      {recipes.map(recipe => (
        <Fragment key={`${recipe.name}-${recipe.date}`}>
          <div className={'Recipes__card'}>
            <div className="Recipes__card-head">
              <button type="button" aria-label={`Edit ${recipe.name}`}>
                <div aria-hidden="true" className="fa fa-pencil"></div>
              </button>
              <img src={recipe.image} alt="" role="presentation" />
            </div>
            <div className="Recipes__card-content">
              <h3>{recipe.name}</h3>
              <dl>
                <dt>Prep time</dt>
                <dd>{recipe.prepTime}</dd>
                <dt>Cook time</dt>
                <dd>{recipe.cookTime}</dd>
                <dt>Difficulty</dt>
                <dd className={recipe.difficulty}>{recipe.difficulty}</dd>
              </dl>
            </div>
            <div className="Recipes__card-foot">
              <Button className="dqpl-button-primary">
                <span className="BracketLeft" aria-hidden="true">
                  [
                </span>{' '}
                {`Cook ${recipe.name}`}
                <span className="BracketRight" aria-hidden="true">
                  ]
                </span>
              </Button>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

// TODO Recipes.displayName = 'Recipes'
Recipes.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      cookCount: PropTypes.number,
      cookTime: PropTypes.string,
      date: PropTypes.string,
      difficulty: PropTypes.string,
      greaseFireCount: PropTypes.number,
      image: PropTypes.string,
      ingredients: PropTypes.array,
      instructions: PropTypes.array,
      name: PropTypes.string,
      prepTime: PropTypes.string,
      yumminess: PropTypes.number
    })
  ),
  modalState: PropTypes.shape({
    edit: PropTypes.string,
    view: PropTypes.string
  })
};

export default Recipes;
