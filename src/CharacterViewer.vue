<template>
  <div class="character-viewer" v-if="characterStore.selectedCharacter">
    <div class="card-holder">
      <Details :character="characterStore.selectedCharacter" />
    </div>

    <div class="entry-viewer">
      <EntrySelectors />

      <EntryViewer />
    </div>
  </div>

  <div class="selected-entry"></div>
</template>

<script setup>
import { useCharacterStore } from "@/stores/CharacterStore";

import Details from "./components/character/Details.vue";
import EntrySelectors from "./components/entry/EntrySelectors.vue";
import EntryViewer from "./components/entry/EntryViewer.vue";

const characterStore = useCharacterStore();
</script>

<style scoped>
.character-viewer {
  padding: 0px 40px;
  display: flex;
  gap: 20px;
  height: 80vh;
}

.card-holder {
  width: 50%;
  height: 100%;
}

.entry-viewer {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
