<template>
  <q-page>
    <q-input
      class="q-pt-md search-bar"
      v-model="search"
      round
      filled
      dense
      type="search">
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>

    <h2 class="text-weight-medium">Recipes</h2>
    <div class="row gutter justify-between">
      <q-card
        v-for="recipe in recipes"
        :key="recipe.idMeal"
        class="recipe-card q-mb-sm col-6 col-sm-3"
        flat
        bordered>
        <q-card-section :horizontal='false'>
          <router-link class="" :to="`/recipe-details/${recipe.idMeal}`">
            <q-img
                class="fit"
                :src="recipe.strMealThumb"
              />
            </router-link>
          <q-card-section class="q-ma-sm">
          <h3 class="text-body1 text-weight-medium q-mt-none q-mb-xs">
            <router-link :to="`/recipe-details/${recipe.idMeal}`">{{ recipe.strMeal }}</router-link>
          </h3>
          <q-rating
            v-model="rate"
            color="green-5"
            icon="star_border"
            icon-selected="star"
          />
         <!--  <p class="text-caption text-weight-light q-pr-xs">{{ lorem }}</p> -->
        </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { api } from 'boot/axios';

export default {
  name: 'Home',
  data() {
    return {
      search: '',
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam amet leo vitae...',
      rate: 4,
      recipes: null,
    };
  },
  mounted() {
    api.get('/filter.php?c=Seafood')
      .then((result) => {
        this.recipes = result.data.meals;
        // console.log(this.recipes);
      });
  },
};
</script>

<style lang="scss" scoped>
.q-img {
  width: 100%;
  max-height: 108px;
}

.q-card__section--vert {
  padding: 0;
  /* padding-left: 1rem; */
}

a {
  text-decoration: none;
  color: black;
  cursor: pointer;
}

.search-bar {
  max-width: 360px;
  margin-left: auto;
  margin-right: auto;

}

.recipe-card {
  max-width: 560px;
  margin-right: -5px;
}

</style>
