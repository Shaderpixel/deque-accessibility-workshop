import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  TextField,
  Checkbox
} from 'cauldron-react';
import RecipeModalItem from '../RecipeModalItem';
import './index.css';

export default class RecipeModal extends Component {
  static propTypes = {
    edit: PropTypes.bool,
    show: PropTypes.bool.isRequired,
    validate: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    recipe: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onGreaseChange: PropTypes.func.isRequired,
    setItemRef: PropTypes.func.isRequired,
    setWrapperRef: PropTypes.func.isRequired
  };

  addIngredient = () => this.props.add('ingredients');
  addInstruction = () => this.props.add('instructions');

  /**
   * @param type is either ingredients or instructions
   */
  renderItems = type => {
    const { errors, edit, recipe, setItemRef, onDelete } = this.props;
    const getErrorMessage = i => {
      const errData = errors[type].find(error => {
        return error.errorIndex === i;
      });
      return (errData && errData.errorMessage) || null;
    };
    return recipe[type].map((value, i) => (
      <RecipeModalItem
        key={`${recipe.name}:${value || `empty-${i}`}`}
        error={getErrorMessage(i)}
        edit={edit}
        index={i}
        data={value}
        type={type}
        fieldRef={input => {
          setItemRef(type, i, input);
        }}
        onDelete={onDelete}
      />
    ));
  };

  render() {
    const {
      errors,
      edit,
      show,
      recipe,
      onClose,
      setWrapperRef,
      onGreaseChange,
      validate
    } = this.props;
    const ingredientItems = this.renderItems('ingredients');
    const instructionItems = this.renderItems('instructions');

    return (
      <Modal
        show={show}
        heading={{ text: `${edit ? 'Edit' : 'Cooking'} ${recipe.name}` }}
        onClose={onClose}
        className="RecipeModal"
      >
        <form onSubmit={validate}>
          <ModalContent>
            <h3 id="ingredients-heading">Ingredients</h3>
            <div
              className="RecipeModal__group"
              tabIndex={-1}
              aria-labelledby="ingredients-heading"
              ref={el => setWrapperRef('ingredientsWrapper', el)}
            >
              {edit ? ingredientItems : <ul>{ingredientItems}</ul>}
            </div>
            {edit && (
              <div className="RecipeModal__add-another">
                <button
                  type="button"
                  className="dqpl-link"
                  onClick={this.addIngredient}
                >
                  + Add another ingredient
                </button>
              </div>
            )}
            <h3 id="instructions-heading">Instructions</h3>
            <div
              className="RecipeModal__group"
              tabIndex="-1"
              aria-labelledby="instructions-heading"
              ref={el => setWrapperRef('instructionsWrapper', el)}
            >
              {edit ? instructionItems : <ol>{instructionItems}</ol>}
            </div>
            {edit ? (
              <div className="RecipeModal__add-another">
                <button
                  type="button"
                  className="dqpl-link"
                  onClick={this.addInstruction}
                >
                  + Add another instruction
                </button>
              </div>
            ) : (
              <div className="RecipeModal__global">
                <TextField
                  label="Rate the yumminess (0 - 50)"
                  defaultValue={`${recipe.yumminess}`}
                  type="number"
                  min="0"
                  max="50"
                  fieldRef={el => {
                    console.log(el);
                    setWrapperRef('yumminess', el);
                  }}
                />
                <Checkbox
                  value="true"
                  id="grease-fire"
                  name="crease-fire"
                  label="I caused a grease fire making this"
                  onChange={onGreaseChange}
                />
              </div>
            )}
          </ModalContent>
          <ModalFooter>
            <Button
              type="submit"
              onClick={validate}
              disabled={
                !recipe.instructions.length && !recipe.ingredients.length
              }
            >
              {edit ? 'Save' : 'I cooked it'}
            </Button>
            <Button secondary onClick={onClose}>
              {edit ? 'Cancel' : 'Close'}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    );
  }
}
// what does the Button component from DQ cauldron do? it has a specific styling set for the button element. Comes with the .dqpl-button-primary by default or dpql-button-secondary by adding the secondary prop
