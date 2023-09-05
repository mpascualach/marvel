<template>
  <v-app>
    <v-btn icon @click="toggleTheme" class="theme-toggle-button">
      <v-icon>{{
        darkMode ? "mdi-white-balance-sunny" : "mdi-moon-waxing-crescent"
      }}</v-icon>
    </v-btn>
    <v-main>
      <Select />
      <!-- <p>Selected character: {{ selectedCharacter.name }}</p> -->
      <CharacterViewer />
    </v-main>
  </v-app>
</template>

<script setup>
import Select from "./components/character/Select.vue";
import CharacterViewer from "./CharacterViewer.vue";

import { onMounted, ref } from "vue";
import vuetify from "./plugins/vuetify";

const darkMode = ref(false);

onMounted(() => {
  document.title = "Marvel Character Viewer";
});

const toggleTheme = () => {
  console.log("toggleTheme");
  darkMode.value = !darkMode.value;
  console.log(vuetify);
  vuetify.framework.theme.dark = darkMode.value;
};
</script>

<style scoped>
.theme-toggle-button {
  position: fixed;
  top: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 1;
}
</style>
