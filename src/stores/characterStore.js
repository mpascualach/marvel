import { defineStore } from "pinia";
import { ref } from "vue";

export const useCharacterStore = defineStore("CharacterStore", () => {
  const characters = ref([]);
  const selectedCharacter = ref(null);

  const selectedComic = ref(null);
  const selectedSeries = ref(null);

  return { characters, selectedCharacter, selectedComic, selectedSeries };
});

export default useCharacterStore;
