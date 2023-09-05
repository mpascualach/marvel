<template>
  <v-app>
    <v-btn icon @click="toggleTheme" class="theme-toggle-button">
      <v-icon>{{
        theme.global.current.value.dark
          ? "mdi-white-balance-sunny"
          : "mdi-moon-waxing-crescent"
      }}</v-icon>
    </v-btn>
    <v-main>
      {{ errorStore.errorText }}
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
import { useTheme } from "vuetify";

import { useErrorStore } from "./stores/ErrorStore";

const darkMode = ref(false);
const errorStore = useErrorStore();
const theme = useTheme();

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
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
