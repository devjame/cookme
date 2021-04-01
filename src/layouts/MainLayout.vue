<template>
  <q-layout view="hHh Lpr lFf">
    <q-header reveal elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-space />
        <q-toolbar-title shrink>
          Cook-Me
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="200"
      content-class="bg-grey-1"
    >
      <q-list class="text-grey">
        <q-item-label
          header
          class="text-h2"
        >
          Cook-Me
        </q-item-label>
        <q-item
          v-for="item in tabsLinks"
          :key="item.name"
          :to="item.link"
          exact>
        <q-item-section avatar>
          <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section>
            {{ item.title }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-footer
      reveal
      elevated>
        <q-tabs
        v-model="tab"
        dense
        no-caps
        active-color="orange-3"
        indicator-color="transparent"
        class="text-grey shadow-2"
        align="justify"
      >
       <q-route-tab
          v-for="tab in tabsLinks"
          :to="tab.link"
          :key="tab.name"
          :name="tab.name"
          :icon="tab.icon"
          :label="tab.title" />
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

const linksData = [
  {
    title: 'Home',
    name: 'home',
    icon: 'home',
    link: '/',
  },
  {
    title: 'Saved',
    name: 'saved',
    icon: 'favorite',
    link: '/saved',
  },
  {
    title: ' My Recipe',
    name: 'recipe',
    icon: 'local_dining',
    link: '/recipes',
  },
  {
    title: 'Profile',
    name: 'profile',
    icon: 'account_circle',
    link: '/profile',
  },
];

export default {
  name: 'MainLayout',
  data() {
    return {
      leftDrawerOpen: false,
      tab: 'home',
      tabsLinks: linksData,
    };
  },
};
</script>

<style lang="scss" scoped>
header {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
