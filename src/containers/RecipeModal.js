import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipeModal from '../components/RecipeModal';
import { reset } from 'axe-core';

// validate yumminess as a number when edit is false
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

// validate ingredients and instructions when edit is true
/**
 *
 * @param {*} input one of the input from inputs
 * @param {array} inputs whatever has been inputted, ingredients or instructions
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

  submitSuccess = () => {
    const { edit, updateRecipe, onClose, recipe } = this.props;
    const resetErrors = { errors: defaultErrors };
    const recipeUpdates = edit
      ? {
          ingredients: this.ingredients.filter(i => console.log(i)),
          instructions: this.instructions.filter(i => console.log(i))
        }
      : {
          // when edit is false, only yumminess, greaseFireCount, and cooked can be updated
          yumminess: Number(this.yumminess.value.trim()),
          greaseFireCount:
            recipe.greaseFireCount + (this.state.greaseChecked ? 1 : 0),
          cookCount: recipe.cookCount + 1
        };
    // reset the state
    const newState = edit ? { ...resetErrors, ...recipeUpdates } : resetErrors;
    this.setState(newState);

    // update main App container state
    updateRecipe(recipeUpdates);

    // close modal by setting view state to null
    onClose();
  };

  validate = e => {
    e.preventDefault();
    const { edit } = this.props;
    const inputs = edit
      ? [...this.ingredients, ...this.instructions]
      : [this.yumminess];

    // filter out bad inputs
    const errorneousInputs = inputs.filter(input => {
      return edit ? invalidRecipe(input, inputs) : invalidYumminess(input);
    });

    // no errors found
    if (!errorneousInputs.length) {
      return this.submitSuccess();
    }

    // deal with errors in errorneousInputs array
    const errors = edit
      ? errorneousInputs.reduce(
          (acc, val) => {
            const ingredientsIndex = this.ingredients.indexOf(val);
            if (ingredientsIndex > -1) {
              // if bad input exists in this.ingredients
              acc.ingredients.push(ingredientsIndex);
            } else {
              // bad input must exist in this.instructions
              acc.instructions.push(this.instructions.indexOf(val));
            }
            return acc;
          },
          {
            ingredients: [],
            instructions: []
          }
        )
      : {
          ...this.state.errors,
          yumminess: true
        };

    // store errors in state and after componentDidUpdate ran, set focus on the first errorneousInput
    this.setState({ errors }, () => {
      errorneousInputs[0].focus();
    });
  };

  onGreaseChange = () => {
    this.setState({
      greaseChecked: !this.state.greaseChecked
    });
  };

  // TODO what is type?
  add = type => {
    this.setState(
      {
        [type]: this.state[type].concat('')
      },
      () => {
        const items = this[type];
        items[items.length - 1].focus();
      }
    );
  };

  // TODO what is index, type
  onDelete = (index, type) => {
    let items = [...this.state[type]];
    const focusTarget =
      type === 'ingredients'
        ? this.ingredientsWrapper
        : this.instructionsWrapper;
    // remove the specified index from items
    items = [...items.slice(0, index), ...items.slice(index + 1)];
    this.setState({
      [type]: items
    });

    if (focusTarget) {
      focusTarget.focus();
    }
  };

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

  // TODO what are args
  setItemRef = (type, index, el) => {
    console.log(type, index, el);
    this[type][index] = el;
  };

  setWrapperRef = (type, el) => {
    console.log(type);
    this[type] = el;
  };

  render() {
    this.ingredients = [];
    this.instructions = [];
    const { show, edit, recipe } = this.props;
    const { errors, instructions, ingredients } = this.state;

    // TODO why do I need to rebuild the recipe data to passinto RecipeModal component?
    const recipeData = {
      ...recipe
      //   instructions,
      //   ingredients
    };

    return (
      <RecipeModal
        edit={edit}
        show={show}
        add={this.add}
        errors={errors}
        recipe={recipeData}
        validate={this.validate}
        onClose={this.onClose}
        onDelete={this.onDelete}
        onGreaseChange={this.onGreaseChange}
        setItemRef={this.setItemRef}
        setWrapperRef={this.setWrapperRef}
      />
    );
  }
}
