import App from "./App.vue";

import { createApp } from "vue";
import vuetify from "./vuetify.theme.js";

import { registerPlugins } from "@/plugins";
import { createPinia } from "pinia";

const pinia = createPinia();

const app = createApp(App).use(pinia);
app.use(vuetify);
registerPlugins(app);

app.mount("#app");
