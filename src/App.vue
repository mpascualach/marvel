<template>
  <v-app>
    <v-main>
      <CharacterSelect />
      <p>Selected character: {{ selectedCharacter.name }}</p>
      <CharacterDetails />
    </v-main>
  </v-app>
</template>

<script setup>
import CharacterSelect from "./components/CharacterSelect.vue";
import CharacterDetails from "./components/CharacterDetails.vue";
import { useCharacterStore } from "./stores/characterStore";

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
