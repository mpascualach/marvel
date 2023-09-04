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
import { useCharacterStore } from "@/stores/CharacterStore";

import { ref, watch } from "vue";

const store = useCharacterStore();
const selectedCharacter = ref(store.selectedCharacter);

watch(
  () => store.selectedCharacter,
  (newCharacter) => {
    selectedCharacter.value = newCharacter;
  }
);
</script>

<style scoped></style>
