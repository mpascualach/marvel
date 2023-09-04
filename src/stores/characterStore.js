import { defineStore } from "pinia";
import { ref } from "vue";

export const useCharacterStore = defineStore("CharacterStore", () => {
  const characters = ref([]);
  const selectedCharacter = ref(null);

  return { characters, selectedCharacter };
});

export default useCharacterStore;
