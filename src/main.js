import { createApp } from "vue";
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

// toast options
const options = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 3,
  newestOnTop: true,
  filterToasts: (toasts) => {
    // Keep track of existing types
    const types = {};
    return toasts.reduce((aggToasts, toast) => {
      // Check if type was not seen before
      if (!types[toast.type]) {
        aggToasts.push(toast);
        types[toast.type] = true;
      }
      return aggToasts;
    }, []);
  },
};

app.use(createPinia());
app.use(router);
app.use(Toast);

app.mount("#app");
