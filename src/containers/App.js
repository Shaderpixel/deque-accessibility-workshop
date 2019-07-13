import React, { Component } from 'react';
import App from '../components/App';
import data from '../data';
import eggIcon from '../img/icons/egg.svg';
import fireIcon from '../img/icons/fire.svg';
import recipeIcon from '../img/icons/recipe.svg';

const STORAGE_KEY = 'deque-recipe';

export default class AppContainer extends Component {
  constructor() {
    super();
    const recipes = this.getData();
    this.state = {
      recipes,
      stats: this.getStats(recipes),
      modal: {
        edit: null,
        view: null
      }
    };
  }

  /**
   * Gets recipe data from localStorage using provided key
   * otherwise pull from data file
   */
  getData = () => {
    const storageData = localStorage.getItem(STORAGE_KEY);
    return storageData ? JSON.parse(storageData) : data;
  };

  /**
   * Generates an array of recipe stats
   *
   * @param {Array} recipes
   * @returns {Array} array of object containing: label, value, and icon(optional)
   */
  getStats = recipes => {
    const recipesMade = recipes.reduce(
      (acc, recipe) => (acc += recipe.cookCount),
      0
    );

    const eggsUsed = recipes.reduce((acc, recipe) => {
      const eggsInRecipe = recipe.ingredients.filter(ingredient =>
        ingredient.includes('egg')
      );

      if (eggsInRecipe.length) {
        eggsInRecipe.forEach(eggEntry => {
          acc +=
            Number(
              eggEntry
                .split('')
                .filter(char => !isNaN(Number(char)) && Number(char) > 0)
            ) * recipe.cookCount;
        });
      }
      return acc;
    }, 0);

    const greaseFires = recipes.reduce(
      (acc, recipe) =>
        recipe.greaseFireCount ? (acc += recipe.greaseFireCount) : acc,
      0
    );

    /**
     * @params data: array
     * returns an int or 0 if NaN
     */
    const getAverage = data =>
      Math.floor(
        data.reduce((acc, entry) => (acc += entry), 0) / data.length
      ) || 0;

    const histogram = recipes
      .reduce((acc, recipe) => {
        const month = new Date(recipe.date).getMonth() + 1;
        const index = acc.findIndex(el => el.month === month);
        index === -1
          ? acc.push({ month, yumminess: [recipe.yumminess] })
          : acc[index].yumminess.push(recipe.yumminess);
        return acc;
      }, [])
      .map(monthlyStat => ({
        ...monthlyStat,
        yumminess: getAverage(monthlyStat.yumminess)
      }));
    // possible to use recursion?

    const averageYumminess = getAverage(
      recipes.map(recipe => recipe.yumminess)
    );

    return [
      {
        label: 'Eggs used',
        value: eggsUsed,
        icon: eggIcon
      },
      {
        label: 'Recipes made',
        value: recipesMade,
        icon: recipeIcon
      },
      {
        label: 'Grease fires',
        value: greaseFires,
        icon: fireIcon
      },
      {
        label: 'Yumminess',
        value: averageYumminess,
        histogram
      }
    ];
  };

  updateModalState = newModalState => {
    // const newState = {...this.state, modal: {...this.state.modal, ...newModalState}};
    this.setState({ modal: { ...this.state.modal, ...newModalState } });
  };

  /**
   * TODO Create update state and localStorage methods: setData, updateRecipe
   */

  render() {
    const { recipes, stats, modal } = this.state;
    return (
      <App
        recipes={recipes}
        stats={stats}
        modalState={modal}
        updateModalState={this.updateModalState}
      />
    );
  }
}
