import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipeModal from '../components/RecipeModal';

const invalidYumminess = input => {
  const value = value && value.trim();
  const convertedNumber = value && Number(value);
  return (
    !value ||
    isNaN(convertedNumber) ||
    convertedNumber > 50 ||
    convertedNumber < 0
  );
};

//where is invalidRecipe used? what are the arguments really? doesn't make sense
/**
 *
 * @param {*} input
 * @param {*} inputs
 */
const invalidRecipe = (input, inputs) => {
  const isEmpty = input && !input.value.trim();
  const isDuplicate = inputs.find(
    otherInput =>
      otherInput &&
      input &&
      otherInput !== input &&
      otherInput.value === input.value
  );

  return isEmpty || isDuplicate;
};

const defaultErrors = {
  ingredients: [],
  instructions: [],
  yumminess: false,
  insufficient: false
};

export default class RecipeModalContainer extends Component {
  static propTypes = {
    edit: PropTypes.bool,
    show: PropTypes.bool.isRequired,
    recipe: PropTypes.object.isRequired,
    updateRecipe: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
  };

  static defaultProps = {
    edit: false
  };

  constructor(props) {
    super(props);
    const { recipe } = this.props;
    this.state = {
      errors: defaultErrors,
      greaseChecked: false,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions
    };
  }

  onClose = () => {
    const {
      recipe: { ingredients, instructions },
      onClose
    } = this.props;
    // reset state
    this.setState({
      ingredients,
      instructions,
      greaseChecked: false
    });
    onClose();
  };

  render() {
    const { show, edit, recipe } = this.props;

    // TODO why do I need to rebuild the recipe data to passinto RecipeModal component?
    // const { ingredients, instructions } = this.state;
    // const recipeData = {
    //   ...recipe,
    //   instructions,
    //   ingredients
    // };

    return (
      <RecipeModal
        edit={edit}
        show={show}
        recipe={recipe}
        onClose={this.onClose}
      />
    );
  }
}
