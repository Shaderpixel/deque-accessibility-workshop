import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from 'cauldron-react';
import RecipeModal from '../../containers/RecipeModal';
import './index.css';

const Recipes = ({
  recipes,
  updateRecipe,
  updateModalState,
  modalState: { edit, view } // multi level destructuring
}) => {
  const modalIsShowing = edit || view;
  const buttonTabIndex = modalIsShowing ? -1 : 0;

  return (
    <div className="Recipes">
      {recipes.map((recipe, index) => (
        <Fragment key={`${recipe.name}-${recipe.date}`}>
          <div className={'Recipes__card'}>
            <div className="Recipes__card-head">
              <button
                type="button"
                aria-label={`Edit ${recipe.name}`}
                onClick={() => updateModalState({ edit: recipe.name })}
                tabIndex={buttonTabIndex}
              >
                <Icon type="fa-pencil" />
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
              <Button
                onClick={() => updateModalState({ view: recipe.name })}
                tabIndex={buttonTabIndex}
              >
                <span className="BracketLeft" aria-hidden="true">
                  [
                </span>
                <span>{`Cook ${recipe.name}`}</span>
                <span className="BracketRight" aria-hidden="true">
                  ]
                </span>
              </Button>
            </div>
          </div>
          {/* view modal */}
          <RecipeModal
            show={view === recipe.name}
            updateRecipe={data => updateRecipe(index, data)}
            onClose={() => updateModalState({ view: null })}
            recipe={recipe}
          />
          {/* edit modal */}
          <RecipeModal
            edit
            show={edit === recipe.name}
            updateRecipe={data => updateRecipe(index, data)}
            onClose={() => updateModalState({ edit: null })}
            recipe={recipe}
          />
        </Fragment>
      ))}
    </div>
  );
};

Recipes.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      cookCount: PropTypes.number.isRequired,
      cookTime: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      difficulty: PropTypes.string.isRequired,
      greaseFireCount: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      ingredients: PropTypes.array.isRequired,
      instructions: PropTypes.array.isRequired,
      name: PropTypes.string.isRequired,
      prepTime: PropTypes.string.isRequired,
      yumminess: PropTypes.number.isRequired
    })
  ),
  modalState: PropTypes.shape({
    edit: PropTypes.string,
    view: PropTypes.string
  }),
  updateRecipe: PropTypes.func.isRequired,
  updateModalState: PropTypes.func.isRequired
};

Recipes.displayName = 'Recipes';
export default Recipes;
