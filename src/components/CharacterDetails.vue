<template>
  <div class="character-viewer" v-if="characterStore.selectedCharacter">
    <v-card class="character-card">
      <div class="character-details">
        <h2 class="character-title">
          {{ characterStore.selectedCharacter.name }}
        </h2>
        <p class="character-description">
          {{ characterStore.selectedCharacter.description }}
        </p>
      </div>
      <div class="character-img-container">
        <img
          class="character-img"
          :src="`${characterStore.selectedCharacter.thumbnail.path}.${characterStore.selectedCharacter.thumbnail.extension}`"
        />
      </div>
    </v-card>

    <div class="comic-selector">
      <v-select
        v-if="characterStore.selectedCharacter.comics"
        variant="outlined"
        label="Comics"
        :items="characterStore.selectedCharacter.comics.items"
        item-title="name"
        @update:model-value="handleComicSelection"
      ></v-select>
      <v-select
        v-if="characterStore.selectedCharacter.series"
        variant="outlined"
        label="Series"
        :items="characterStore.selectedCharacter.series.items"
        item-title="name"
        @update:model-value="handleSeriesSelection"
      ></v-select>
    </div>
  </div>

  <div class="selected-entry"></div>
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
