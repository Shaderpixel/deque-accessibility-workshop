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

export { fakeStats, LocalStorageMock };
