<template>
  <v-card v-if="characterStore.entrySelected" class="entry">
    <div
      class="content comic"
      v-if="
        characterStore.typeOfEntry == 'comic' && characterStore.selectedComic
      "
    >
      <h2>{{ characterStore.selectedComic.title }}</h2>
      <div
        class="description"
        v-html="characterStore.selectedComic.description"
      ></div>
      <img
        v-if="characterStore.selectedComic.thumbnail"
        :src="`${characterStore.selectedComic.thumbnail.path}.${characterStore.selectedComic.thumbnail.extension}`"
      />
    </div>
    <div
      class="content series"
      v-if="
        characterStore.typeOfEntry == 'series' && characterStore.selectedSeries
      "
    >
      <h2>{{ characterStore.selectedSeries.title }}</h2>
      <p>{{ characterStore.selectedSeries.description }}</p>
      <p>
        Run date: {{ characterStore.selectedSeries.startYear }} -
        {{ characterStore.selectedSeries.endYear }}
      </p>
    </div>
  </v-card>
</template>

<script setup>
import { useCharacterStore } from "@/stores/CharacterStore";
const characterStore = useCharacterStore();
</script>

<style scoped>
.entry {
  flex: 1 1 0%;
  padding: 10px 20px;
  overflow-y: scroll;
}
.content {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.description {
  padding: 20px;
}
</style>
