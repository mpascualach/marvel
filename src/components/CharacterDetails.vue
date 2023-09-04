<template>
  <div class="character-viewer"></div>
</template>

<script setup>
import { useCharacterStore } from "../stores/characterStore";
import { watch } from "vue";

const characterStore = useCharacterStore();

watch(
  () => characterStore.selectedCharacter,
  (newSelectedCharacter, oldSelectedCharacter) => {
    console.log("Showing deets for: ", newSelectedCharacter);
    console.log("old character here: ", oldSelectedCharacter);
  }
);
</script>

<style scoped></style>
