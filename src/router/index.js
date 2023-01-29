import { createRouter, createWebHistory } from "vue-router";
import CountryList from "../components/CountryList.vue";
import CountryPage from "../components/CountryPage.vue";

const routes = [
  {
    path: "/",
    name: "Countries",
    component: CountryList,
  },
  {
    path: "/country/:id",
    name: "Country",
    component: CountryPage,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
export { routes };
