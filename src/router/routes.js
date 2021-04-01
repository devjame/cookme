const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/home.vue') },
      { path: 'profile', component: () => import('src/pages/profile.vue') },
      { path: 'recipes', component: () => import('src/pages/recipes.vue') },
      { path: 'saved', component: () => import('src/pages/saved.vue') },
      { path: 'recipe-details/:id', component: () => import('src/pages/recipe-details.vue'), props: true },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
