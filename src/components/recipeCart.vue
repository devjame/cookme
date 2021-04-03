<template lang="">
  <div>
    <h2 class="text-weight-medium"><slot>Recipes</slot></h2>
    <div class="row gutter justify-between">
      <q-card
        v-for="recipe in recipes"
        :key="recipe.idMeal"
        class="recipe-card q-mb-sm col-6 col-sm-4 col-md-3 col-lg-2"
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
  </div>
</template>
<script>
export default {
  props: ['recipes'],
  data() {
    return {
      rate: 4,
    };
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
}

a {
  text-decoration: none;
  color: black;
  cursor: pointer;
}
.recipe-card {
  max-width: 560px;
  margin-right: -5px;
}
</style>
