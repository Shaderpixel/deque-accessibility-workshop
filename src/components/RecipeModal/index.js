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

  /**
   * @param type is either ingredients or instructions
   */
  renderItems = type => {
    const { errors, edit, recipe, setItemRef, onDelete } = this.props;
    return recipe[type].map((value, i) => (
      <RecipeModalItem
        key={`${recipe.name}:${value || `empty-${i}`}`}
        error={null} //TODO expand further
        edit={edit}
        index={i}
        data={value}
        type={type}
        onDelete={onDelete}
      />
    ));
  };

  render() {
    const { edit, show, recipe, onClose } = this.props;
    const ingredientItems = this.renderItems('ingredients');
    const instructionItems = this.renderItems('instructions');

    return (
      <Modal
        show={show}
        heading={{ text: `${edit ? 'Edit' : 'Cooking'} ${recipe.name}` }}
        onClose={onClose}
        className="RecipeModal"
      >
        <form>
          <ModalContent>
            <h3 id="ingredients-heading">Ingredients</h3>
            <div
              className="RecipeModal__group"
              tabIndex={-1}
              aria-labelledby="ingredients-heading"
            >
              {edit ? ingredientItems : <ul>{ingredientItems}</ul>}
            </div>
            {edit && (
              <div className="RecipeModal__add-another">
                <button type="button" className="dqpl-link">
                  + Add another ingredient
                </button>
              </div>
            )}
            <h3 id="instructions-heading">Instructions</h3>
            <div
              className="RecipeModal__group"
              tabIndex="-1"
              aria-labelledby="instructions-heading"
            >
              {edit ? instructionItems : <ol>{instructionItems}</ol>}
            </div>
            {edit ? (
              <div className="RecipeModal__add-another">
                <button type="button" className="dqpl-link">
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
                />
                <Checkbox
                  value="true"
                  id="grease-fire"
                  name="crease-fire"
                  label="I caused a grease fire making this"
                />
              </div>
            )}
          </ModalContent>
          <ModalFooter>
            <Button
              type="submit"
              disabled="!recipe.instructions.length && !recipe.ingredients.length"
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
// what does the Button component from DQ cauldron do?
