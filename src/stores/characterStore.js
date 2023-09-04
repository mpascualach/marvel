import { defineStore } from "pinia";
import { ref } from "vue";

export const useCharacterStore = defineStore("CharacterStore", () => {
  const characters = ref([]);
  const selectedCharacter = ref(null);

  const entryHasBeenSelected = ref(false);
  const comicHasBeenSelected = ref(false);
  const seriesHasBeenSelected = ref(false);

  const selectedComic = ref(null);
  const selectedSeries = ref(null);

  return {
    characters,
    selectedCharacter,
    comicHasBeenSelected,
    seriesHasBeenSelected,
    selectedComic,
    selectedSeries,
  };
});

export default useCharacterStore;
