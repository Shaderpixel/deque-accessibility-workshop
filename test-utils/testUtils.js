const fakeStats = [
  {
    label: 'Eggs used',
    value: 3,
    icon: '/egg.svg'
  },
  {
    label: 'Recipes made',
    value: 18,
    icon: '/recipe.svg'
  },
  {
    label: 'Grease fires',
    value: 6,
    icon: '/fire.svg'
  },
  {
    label: 'Yumminess',
    value: 45,
    histogram: []
  }
];

const testRecipe = [
  {
    name: 'Chocolate Cake',
    date: '11/17/2018',
    cookCount: 1,
    image: '/food/cake.png',
    prepTime: '20 min',
    cookTime: '30 min',
    difficulty: 'Beginner',
    greaseFireCount: 0,
    yumminess: 50,
    ingredients: [
      '2 cups white sugar',
      '1 3/4 cups of all-purpose flour',
      '3/4 cup unsweetened cocoa powder',
      '1 1/2 teaspoons baking powder',
      '1 1/2 teaspoons baking soda',
      '1 teaspoon of salt',
      '2 eggs',
      '1 cup milk',
      '1/2 cup vegetable oil',
      '2 teaspoons vanilla extract',
      '1 cup boiling water'
    ]
  }
];

const defaultModalState = {
  edit: null,
  view: null
};

// Fake LocalStorage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

export { fakeStats, LocalStorageMock, testRecipe, defaultModalState };
