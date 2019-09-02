import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipeModal from '../components/RecipeModal';
import { reset } from 'axe-core';

// validate yumminess as a number when edit is false
const invalidYumminess = input => {
  const value = input && input.value.trim();
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
 * @param {*} input one of the input from inputs
 * @param {array} inputs all of the form input fields, ingredients or instructions
 */
const invalidRecipe = (input, inputs) => {
  const isEmpty = input && !input.value.trim();
  const isDuplicate = inputs.find(
    otherInput =>
      otherInput && // make sure otherInput and input are not empty and can be to compared with the first argument
      input &&
      otherInput !== input && // make sure that the otherInput is not referencing the same input in the first argument
      otherInput.value === input.value
  );

  return isEmpty || isDuplicate;
};

const isEmpty = input => input && !input.value.trim();

// basic string comparison of array contents to make sure local state is up to date
const arrayStringIsEqual = (type, newProps, state) => {
  let i = state[type].length;
  while (i--) {
    if (state[type][i] !== newProps.recipe[type][i]) return false;
  }
  return true;
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

  // the view-only modal's local state doesn't update immediately after an edit even though props contain the changes. This compares the props and state values and forces an update if not the same
  static getDerivedStateFromProps(newProps, state) {
    if (!arrayStringIsEqual('ingredients', newProps, state)) {
      return {
        ingredients: newProps.recipe.ingredients
      };
    }
    if (!arrayStringIsEqual('instructions', newProps, state)) {
      return {
        instructions: newProps.recipe.instructions
      };
    }
    // return null to indicate no change in state
    return null;
  }

  submitSuccess = () => {
    const { edit, updateRecipe, onClose, recipe } = this.props;
    const resetErrors = { errors: defaultErrors };
    const recipeUpdates = edit
      ? {
          ingredients: this.ingredients.map(ing => ing.value),
          instructions: this.instructions.map(inst => inst.value)
        }
      : {
          // when edit is false, only yumminess, greaseFireCount, and cooked can be updated
          yumminess: Number(this.yumminess.value.trim()),
          greaseFireCount:
            recipe.greaseFireCount + (this.state.greaseChecked ? 1 : 0),
          cookCount: recipe.cookCount + 1
        };
    // update state with all the input values set through setItemRef
    const newState = edit ? { ...resetErrors, ...recipeUpdates } : resetErrors;
    // update main App container state
    updateRecipe(recipeUpdates);

    this.setState(newState);

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
    const erroneousInputs = inputs.filter(input => {
      return edit ? invalidRecipe(input, inputs) : invalidYumminess(input);
    });

    // no errors found
    if (!erroneousInputs.length) {
      return this.submitSuccess();
    }
    // deal with errors in erroneousInputs array
    console.log(erroneousInputs);
    const errors = edit
      ? erroneousInputs.reduce(
          (acc, val) => {
            const ingredientsIndex = this.ingredients.indexOf(val);
            if (ingredientsIndex > -1) {
              // if bad input exists in this.ingredients
              const errorMessage = isEmpty(val)
                ? 'Field is empty'
                : 'Value already exist';
              acc.ingredients.push({
                errorIndex: ingredientsIndex,
                errorMessage: errorMessage
              });
            } else {
              // bad input must exist in this.instructions
              const errorMessage = isEmpty(val)
                ? 'Field is empty'
                : 'Value already exist';
              acc.instructions.push({
                errorIndex: this.instructions.indexOf(val),
                errorMessage: errorMessage
              });
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
    console.log(errors);
    // store errors in state and after componentDidUpdate ran, set focus on the first errorneousInput
    this.setState({ errors }, () => {
      erroneousInputs[0].focus();
    });
  };

  onGreaseChange = () => {
    this.setState({
      greaseChecked: !this.state.greaseChecked
    });
  };

  /**
   * @param string type is either ingredients or instructions
   */
  add = type => {
    // adding an entry in the state[type] array will create a blank RecipeModalItem via renderItems method in RecipeModal component
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

  /**
   * @param index - number the item inside ingredients or instructions
   * @param type - string type is either ingredients or instructions
   */
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
    // reset state to what was passed in via props in case things were modified but not saved
    this.setState({
      ingredients,
      instructions,
      greaseChecked: false
    });
    onClose();
  };

  /**
   * setItemRef is a function used as a callback ref in recipe modal component
   * @param {string} type value is either instructions or ingredients
   * @param {number} index - int the index of array.map
   * @param {Element} el the node that is generated by Textfield Cauldron component, setItemRef is a param on RecipeModalItem set in RecipeModal component
   */
  setItemRef = (type, index, el) => {
    this[type][index] = el;
  };

  /**
   * setWrapperRef is a function used as a callback ref in recipe modal component
   * @param {string} type value is either instructionsWrapper or ingredientsWrapper
   * @param {Element} el node the node that setWrapperRef is assigned to ref param in RecipeModal component
   */
  setWrapperRef = (type, el) => {
    this[type] = el;
  };

  render() {
    this.ingredients = [];
    this.instructions = [];
    const { show, edit, recipe } = this.props;
    const { errors, instructions, ingredients } = this.state;
    // rebuild recipe data by reflecting things that have been removed or added via onDelete
    const recipeData = {
      ...recipe,
      instructions,
      ingredients
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

// TODO Fix AXE error
// TODO Fix any broken tests
