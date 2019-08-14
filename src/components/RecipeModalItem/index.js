import React from 'react';
import PropTypes from 'prop-types';
import { Icon, TextField, Button } from 'cauldron-react';
import './index.css';

/**
 * Renders a recipe item (an ingredient or instruction).
 * Renders a text field if edit is true, otherwise a list item.
 */
const RecipeModalItem = ({ edit, data, index, type, onDelete, ...rest }) => {
  const Wrapper = edit ? 'div' : 'li';
  const text = type === 'instructions' ? 'Instruction' : 'Ingredient';
  return (
    <Wrapper className="RecipeModalItem">
      {edit ? (
        <>
          <TextField
            required
            multiline={type === 'instructions'} // boolean toggles between input and textarea
            label={`${text} ${index + 1}`}
            defaultValue={data}
            {...rest}
          />
          <button
            type="button"
            className="RecipeModal__ingredient-delete"
            aria-label={`Remove ${text} ${index + 1}}`}
            onClick={() => onDelete(index, type)}
          >
            <Icon type="fa-trash" />
          </button>
        </>
      ) : (
        data
      )}
    </Wrapper>
  );
};

RecipeModalItem.propTypes = {
  edit: PropTypes.bool,
  data: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
};

RecipeModalItem.defaultProps = {
  edit: false,
  type: 'ingredient'
};
// TODO RecipeModalItem.displayName = 'RecipeModalItem';
export default RecipeModalItem;
