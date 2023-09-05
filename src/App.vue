<template>
  <v-app>
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

import { onMounted } from "vue";

onMounted(() => {
  document.title = "Marvel Character Viewer";
});
</script>

<style scoped></style>
