import { api } from 'boot/axios';
import { LocalStorage } from 'quasar';

export default {
  namespace: true,
  state: {
    recipes: [],
    recipeInfo: {},
    ingredients: [],
    instructions: [],
    tags: [],
    favorited: [],
  },

  mutations: {
    SET_RECIPES(state, payload) {
      state.recipes = payload;
    },
    SET_RECIPEById(state, recipe) {
      state.recipeInfo = recipe;
    },
    SET_TAGS(state, recipe) {
      if (recipe.strTags) {
        state.tags = recipe.strTags.split(',');
      }
    },
    SET_INSTRUCTIONS(state, recipe) {
      const instructionsData = recipe.strInstructions.split('\r\n');
      state.instructions = instructionsData.filter((item) => item !== '');
    },
    SET_INGREDIENTS(state, recipe) {
      const recipeKeys = Object.keys(recipe);
      const ingrediente = recipeKeys.filter((key) => key.includes('strIngredient'));
      state.ingredients = ingrediente.filter((item) => recipe[item] !== '' && recipe[item] !== null);
    },
    SET_FAVORITE(state, recipe) {
      state.favorited.push(recipe);
    },
    REMOVE_FAVORITE(state, recipe) {
      state.favorited = state.favorited.filter((favorite) => favorite !== recipe);
    },
  },

  actions: {
    setRecipes({ commit }) {
      api.get('/filter.php?c=Seafood')
        .then((response) => {
          commit('SET_RECIPES', response.data.meals);
          // console.log(state.recipes);
        });
    },
    getRecipe({ commit }, id) {
      api.get(`/lookup.php?i=${id}`)
        .then((response) => {
          const [recipe] = response.data.meals;
          commit('SET_RECIPEById', recipe);
          commit('SET_INGREDIENTS', recipe);
          commit('SET_INSTRUCTIONS', recipe);
          commit('SET_TAGS', recipe);
          // console.log(response.data.meals[0]);
        });
    },
    saveMeal({ commit }, payload) {
      if (payload.favorited === true) {
        commit('SET_FAVORITE', payload.recipe);
        LocalStorage.set('favoritedRecipe', payload.recipe);
      } else {
        commit('REMOVE_FAVORITE', payload.recipe);
        LocalStorage.set('favoritedRecipe', payload.recipe);
      }
    },
  },

  getters: {},

};
