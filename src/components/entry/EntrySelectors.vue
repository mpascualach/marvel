<template>
  <div class="entry-selectors">
    <v-select
      v-if="characterStore.selectedCharacter.comics"
      variant="solo"
      label="Comics"
      :items="characterStore.selectedCharacter.comics.items"
      item-title="name"
      item-value="id"
      @update:model-value="handleComicSelection"
      :menu-props="{ bottom: true }"
    ></v-select>
    <v-select
      v-if="characterStore.selectedCharacter.series"
      variant="solo"
      label="Series"
      :items="characterStore.selectedCharacter.series.items"
      item-title="name"
      item-value="id"
      @update:model-value="handleSeriesSelection"
      :menu-props="{ bottom: true }"
    ></v-select>
  </div>
</template>

<script setup>
import { useCharacterStore } from "@/stores/CharacterStore";
import { mande } from "mande";

const characterStore = useCharacterStore();

// por razones que tenga que ver con mostrar estos comics en los v-select
let selectedComic, selectedSeries;

const handleComicSelection = async (selectedValue) => {
  selectedComic = characterStore.selectedCharacter.comics.items.find(
    (comic) => comic.name === selectedValue
  );
  if (selectedSeries) selectedSeries = null;

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
    console.log(characterStore.selectedComic);
    characterStore.selectedSeries = "";
  } catch (error) {
    errorStore.errorText = error.message;
  }
};

const handleSeriesSelection = async (selectedValue) => {
  // básicamente lo mismo que handleComicSelection - quizás las pueda combinar
  console.log(selectedValue);
  selectedSeries = characterStore.selectedCharacter.series.items.find(
    (series) => series.name === selectedValue
  );
  if (selectedComic) selectedComic = null;
  console.log(selectedSeries);
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
    characterStore.entrySelected = true;
    characterStore.typeOfEntry = "series";
    // parece que sólo hay un resultado dentro del results array...
    characterStore.selectedSeries = data.results[0];
    characterStore.selectedComic = "";
  } catch (error) {
    errorStore.errorText = error.message;
  }
};
</script>

<style scoped>
.entry-selectors {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
</style>
