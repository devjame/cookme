<template>
  <q-page>
     <recipe-cart :recipes="favorited">
       Favorited
     </recipe-cart>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import recipeCart from '../components/recipeCart.vue';

export default {
  // name: 'PageName',
  components: { recipeCart },
  computed: {
    ...mapState({
      favorited: (state) => state.recipe.favorited,
    }),
  },
};
</script>
