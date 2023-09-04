<template>
  <div class="character-viewer" v-if="characterStore.selectedCharacter">
    <div class="character-info">
      <v-card
        :title="characterStore.selectedCharacter.name"
        :text="characterStore.selectedCharacter.description"
      >
      </v-card>
      <div class="character-img-container">
        <img
          class="character-img"
          :src="`${characterStore.selectedCharacter.thumbnail.path}.${characterStore.selectedCharacter.thumbnail.extension}`"
        />
      </div>
    </div>

    <div class="comic-selector">
      <v-select
        v-if="characterStore.selectedCharacter.comics"
        variant="outlined"
        label="comics"
        :items="characterStore.selectedCharacter.comics.items"
        item-title="name"
      ></v-select>
      <v-select variant="outlined"></v-select>
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

.character-img {
  width: 50%;
}

.comic-selector {
  display: flex;
}

.comic-selector > .v-select {
  margin: 10px;
}
</style>
