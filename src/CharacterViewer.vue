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

.card-holder {
  margin-bottom: 20px;
}
@media (max-width: 1105px) {
  .character-viewer {
    grid-template-columns: 1fr;
  }
}
</style>
