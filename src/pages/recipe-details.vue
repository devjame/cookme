/* eslint-disable max-len */
<template>
  <q-page>
    <div class="n-margin">
      <q-img
        v-if="recipe"
        :src="recipe.strMealThumb"
      >
        <q-btn
          v-go-back.single
          class="absolute-top-left all-pointer-events"
          style="top: 8px; left: 8px"
          size="16px"
          flat
          color="white"
          dense
          icon="arrow_back_ios" />
        <q-icon
          class="absolute-top-right all-pointer-events"
          style="top: 8px; right: 8px"
          clickable
          size="32px"
          @click="saveMeal"
          :class="favorited ? 'text-yellow' : 'text-white'"
          name="bookmark" />
      </q-img>
      <q-skeleton v-else type="rect" />
    </div>
    <div class="recipe-content">
      <div>
        <h3 v-if="recipe" class="text-center q-py-md no-margin">{{ recipe.strMeal }}</h3>
        <q-skeleton v-else type="text" />
        <div v-if="recipe" class="q-mb-md text-center">
          <div>
            <q-chip>{{ recipe.strCategory }}</q-chip>
            <q-chip>{{ recipe.strArea }}</q-chip>
          </div>
          <div class="q-mt-sm" v-if="tags">
            Tags:
            <q-chip v-for="tag in tags" :key="tag">{{ tag }}</q-chip>
          </div>
        </div>
        <!-- <div class="q-pb-md row justify-center">
          <q-rating
            v-model="rate"
            color="green-5"
            icon="star_border"
            icon-selected="star"
          />
          <p class="no-margin q-pl-md">
            (123) Reviews
          </p>
        </div> -->
      </div>
      <h3 class="q-mb-md">
        {{ recipe ? `Ingredientes (${ingredientes.length})` : 'Ingredientes' }}
      </h3>
      <q-list
      class="row q-col-gutter-md">
        <q-item
          class="col-6 col-sm-4"
          v-for="(ingrediente, i) in ingredientes"
          :key="ingrediente">
          <q-item-section avatar>
            <q-avatar>
              <img :src="`https://www.themealdb.com/images/ingredients/${recipe[ingrediente]}.png`">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              {{ ` ${recipe[`strMeasure${i+1}`]} ${recipe[ingrediente]}` }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <div class="q-mb-md">
        <h3>{{ recipe ? `Instruções (${instructions.length})` : 'Instruções' }}</h3>
        <q-list
        class="row q-col-gutter-md">
          <q-item
            class="col-sm-6"
            v-for="(instruction, i) in instructions"
            :key="i">
            <q-item-section>
              <q-item-label class="text-grey-9">
                {{ instruction }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div style="height: 56px"></div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  // name: 'PageName',
  props: ['id'],
  data() {
    return {
      favorited: false,
      rate: 4,
    };
  },
  computed: {
    ...mapState({
      ingredientes: (state) => state.recipe.ingredients,
      instructions: (state) => state.recipe.instructions,
      tags: (state) => state.recipe.tags,
      recipe: (state) => state.recipe.recipeInfo,
      favorites: (state) => state.recipe.favorited,
    }),
  },
  methods: {
    saveMeal() {
      this.favorited = !this.favorited;
      const payload = { favorited: this.favorited, recipe: this.recipe };
      this.$store.dispatch('saveMeal', payload);
    },
    checkFavorite() {
      const recipes = this.favorites.filter((favorite) => favorite.idMeal === this.id);
      console.log(recipes);
      if (recipes.lenght) {
        this.favorited = true;
      }
    },
  },
  mounted() {
    this.$store.dispatch('getRecipe', this.id);
    this.checkFavorite();
    // console.log(this.recipe1);
  },
};
</script>

<style lang="scss" scoped>
.q-page {
  padding-left: 0 !important;
  padding-right: 0 !important;
  position: relative;
}

.q-header {
  display: none !important;
}
.q-item__section .column > div{
  font-size: 1.25rem;
}
.recipe-content {
  padding-left:15px;
  padding-right:15px;
  position: absolute;
  z-index: 3;
  width: 100%;
  left: 0;
  top: 195px;
  background-color: #fff;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
}
</style>
