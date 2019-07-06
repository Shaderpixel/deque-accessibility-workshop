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
    const recipes = this.getData() || data;
    console.log(recipes);
    this.state = {
      recipes,
      stats: this.getStats(recipes),
      modal: {
        edit: null,
        view: null
      }
    };
  }

  getData = () => {
    const storageData = localStorage.getItem(STORAGE_KEY);
    return storageData && JSON.parse(storageData);
  };

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

    /************************
    /* @params data: array
    *************************/
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

  render() {
    return <App />;
  }
}
