/* eslint-disable global-require */
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
    <recipe-cart :recipes='recipes' />
  </q-page>
</template>

<script>
import recipeCart from '../components/recipeCart.vue';
// import { api } from 'boot/axios';

export default {
  components: { recipeCart },
  name: 'Home',
  data() {
    return {
      search: '',
    };
  },
  computed: {
    recipes() {
      return this.$store.state.recipe.recipes;
    },
  },
};
</script>

<style lang="scss" scoped>
.search-bar {
  max-width: 360px;
  margin-left: auto;
  margin-right: auto;

}
</style>
