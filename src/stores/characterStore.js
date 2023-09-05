import { defineStore } from "pinia";
import { ref } from "vue";

export const useCharacterStore = defineStore("CharacterStore", () => {
  const characters = ref([]);
  const searchedCharacter = ref(null);
  const selectedCharacter = ref(null);

  const entrySelected = ref(false);
  const typeOfEntry = ref(null);

  const selectedComic = ref(null);
  const selectedSeries = ref(null);

  return {
    characters,
    searchedCharacter,
    selectedCharacter,
    entrySelected,
    typeOfEntry,
    selectedComic,
    selectedSeries,
  };
});

export default useCharacterStore;
