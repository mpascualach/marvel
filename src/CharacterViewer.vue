<template>
  <div class="character-viewer" v-if="characterStore.selectedCharacter">
    <div class="card-holder">
      <Details :character="characterStore.selectedCharacter" />
    </div>

    <div class="entry-viewer">
      <div class="entry-selectors">
        <v-select
          v-model="characterStore.selectedComic.name"
          v-if="characterStore.selectedCharacter.comics"
          variant="solo"
          label="Comics"
          :items="characterStore.selectedCharacter.comics.items"
          item-title="name"
          @update:model-value="handleComicSelection"
          :menu-props="{ bottom: true }"
        ></v-select>
        <v-select
          v-model="characterStore.selectedSeries.name"
          v-if="characterStore.selectedCharacter.series"
          variant="solo"
          label="Series"
          :items="characterStore.selectedCharacter.series.items"
          item-title="name"
          @update:model-value="handleSeriesSelection"
          :menu-props="{ bottom: true }"
        ></v-select>
      </div>

      <v-card v-if="characterStore.entrySelected" class="entry">
        <div
          class="content comic"
          v-if="
            characterStore.typeOfEntry == 'comic' &&
            characterStore.selectedComic
          "
        >
          <h2>{{ characterStore.selectedComic.title }}</h2>
          <div
            class="description"
            v-html="characterStore.selectedComic.description"
          ></div>
          <img
            :src="`${characterStore.selectedComic.thumbnail.path}.${characterStore.selectedComic.thumbnail.extension}`"
          />
        </div>
        <div
          class="content series"
          v-if="
            characterStore.typeOfEntry == 'series' &&
            characterStore.selectedSeries
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
    </div>
  </div>

  <div class="selected-entry"></div>
</template>

<script setup>
import { useCharacterStore } from "@/stores/CharacterStore";
import { mande } from "mande";

import Details from "./components/character/Details.vue";

const characterStore = useCharacterStore();

const handleComicSelection = async (selectedValue) => {
  const selectedComic = characterStore.selectedCharacter.comics.items.find(
    (comic) => comic.name === selectedValue
  );

  // una solución sucia ante algo raro que hace mande con urls ya producidas
  const resourceURI = selectedComic.resourceURI;
  const parts = resourceURI.split("/");
  const lastPart = parts[parts.length - 1];
  const comicId = parseInt(lastPart);

  const lastSlashIndex = resourceURI.lastIndexOf("/");
  const URIWithoutID = resourceURI.substring(0, lastSlashIndex);
  // saqué el ID del cómic para luego remeterla dentro de la llamada API

  const comicFinder = mande(URIWithoutID, {
    apikey: import.meta.env.VITE_PUBLIC_KEY,
  });

  try {
    const { data } = await comicFinder.get(
      `/${comicId}?apikey=${import.meta.env.VITE_PUBLIC_KEY}`
    );
    characterStore.entrySelected = true;
    characterStore.typeOfEntry = "comic";
    characterStore.selectedComic = data.results[0];
    characterStore.selectedSeries = "";
  } catch (err) {
    console.error(err);
    // error handling aquí
  }
};

const handleSeriesSelection = async (selectedValue) => {
  // básicamente lo mismo que handleComicSelection - quizás las pueda combinar
  const selectedSeries = characterStore.selectedCharacter.series.items.find(
    (series) => series.name === selectedValue
  );

  const resourceURI = selectedSeries.resourceURI;
  const parts = resourceURI.split("/");
  const lastPart = parts[parts.length - 1];
  const seriesId = parseInt(lastPart);

  const lastSlashIndex = resourceURI.lastIndexOf("/");
  const URIWithoutID = resourceURI.substring(0, lastSlashIndex);

  const seriesFinder = mande(URIWithoutID, {
    apikey: import.meta.env.VITE_PUBLIC_KEY,
  });

  try {
    const { data } = await seriesFinder.get(
      `/${seriesId}?apikey=${import.meta.env.VITE_PUBLIC_KEY}`
    );
    console.log("Series: ", data);
    characterStore.entrySelected = true;
    characterStore.typeOfEntry = "series";
    // parece que sólo hay un resultado dentro del results array...
    characterStore.selectedSeries = data.results[0];
    characterStore.selectedComic = "";
  } catch (err) {
    console.error(err);
    // error handling aquí
  }
};
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
