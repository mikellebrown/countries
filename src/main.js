import { createApp } from "vue";
import router from "./router/index";
import "./style.css";
import App from "./App.vue";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faMagnifyingGlass,
  faCheck,
  faChevronDown,
  faMoon,
  faArrowLeft,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(
  faMagnifyingGlass,
  faCheck,
  faChevronDown,
  faMoon,
  faArrowLeft,
  faSpinner
);

createApp(App)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
