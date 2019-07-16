import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipeModal from '../components/RecipeModal';

export default class RecipeModalContainer extends Component {
  static propTypes = {
    edit: PropTypes.bool,
    show: PropTypes.bool.isRequired,
    recipe: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
  };

  static defaultProps = {
    edit: false
  };

  constructor(props) {
    super(props);
    const { recipe } = this.props;
    this.state = {
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      greaseChecked: false
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
