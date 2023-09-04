<template>
  <div class="character-viewer" v-if="characterStore.selectedCharacter">
    <div class="card-holder">
      <Details :character="characterStore.selectedCharacter" />
    </div>

    <div class="comic-selector">
      <v-select
        v-if="characterStore.selectedCharacter.comics"
        variant="outlined"
        label="Comics"
        :items="characterStore.selectedCharacter.comics.items"
        item-title="name"
        @update:model-value="handleComicSelection"
        :menu-props="{ bottom: true }"
      ></v-select>
      <v-select
        v-if="characterStore.selectedCharacter.series"
        variant="outlined"
        label="Series"
        :items="characterStore.selectedCharacter.series.items"
        item-title="name"
        @update:model-value="handleSeriesSelection"
        :menu-props="{ bottom: true }"
      ></v-select>
    </div>
  </div>

  <div class="selected-entry"></div>
</template>

<script setup>
import { useCharacterStore } from "@/stores/characterStore";
import { watch } from "vue";

import Details from "./components/character/Details.vue";

const characterStore = useCharacterStore();
</script>

<style scoped>
.character-viewer {
  padding: 0px 40px;
}
.character-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
}

.character-img-container {
  width: 200px;
  height: 250px;
  border-radius: 10px;
  position: relative;
  margin: 20px;
}

.character-img {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  right: 0;
}

.character-title {
  font-size: 1.5rem;
  margin-top: 0;
}

.character-details {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.character-description {
  text-align: justify;
}

.comic-selector {
  display: flex;
}

.comic-selector > .v-select {
  margin: 10px;
}
</style>
