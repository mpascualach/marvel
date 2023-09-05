import App from "./App.vue";

import { createApp } from "vue";

import { registerPlugins } from "@/plugins";
import { createPinia } from "pinia";

const pinia = createPinia();

const app = createApp(App).use(pinia);

registerPlugins(app);

app.mount("#app");
