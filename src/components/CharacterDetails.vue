<template>
  <div class="character-viewer" v-if="characterStore.selectedCharacter">
    <p>Nombre: {{ characterStore.selectedCharacter.name }}</p>
    <p>
      Descripción:
      {{ characterStore.selectedCharacter.description || "Ninguna por ahora" }}
    </p>
    <img
      class="character-img"
      :src="`${characterStore.selectedCharacter.thumbnail.path}.${characterStore.selectedCharacter.thumbnail.extension}`"
    />
    <v-select variant="outlined"></v-select>
    <v-select variant="outlined"></v-select>
  </div>
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

<style scoped>
.character-viewer {
  padding: 0px 40px;
}

.character-img {
  width: 50%;
}
</style>
