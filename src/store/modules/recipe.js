import { api } from 'boot/axios';

export default {
  state: {
    recipes: [],
  },

  mutations: {
    SET_RECIPES(state, payload) {
      state.recipe = payload;
    },
  },

  actions: {
    setRecipes({ state }) {
      api.get('/filter.php?c=Seafood')
        .then((result) => {
          state.recipes = result.data.meals;
          // console.log(this.recipes);
        });
    },
    getRecipe(id) {
      this.$api.get(`/lookup.php?i=${id}`)
        .then((response) => {
          const [recipe] = response.data.meals;
          this.getIngredientes(recipe);
          this.instructionsData = this.recipe.strInstructions.split('\r\n');
          this.instructions = this.instructionsData.filter((item) => item !== '');
          this.tags = this.recipe.strTags ? this.recipe.strTags.split(',') : null;
          // console.log(response.data.meals[0]);
        });
    },
    getIngredientes(recipe) {
      const recipeKeys = Object.keys(recipe);
      const ingrediente = recipeKeys.filter((key) => key.includes('strIngredient'));
      this.ingredientes = ingrediente.filter((item) => recipe[item] !== '' && recipe[item] !== null);
    },
    saveMeal(id) {
      this.favorited = !this.favorited;
      if (this.favorited) {
        this.$q.localStorage.set(id, this.recipe);
      } else {
        this.$q.localStorage.remove(id);
      }
    },
  },

  getters: {},

};
