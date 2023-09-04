import { defineStore } from "pinia";

export const useCharacterStore = defineStore("CharacterStore", {
  state: () => {
    return {
      characters: [],
      selectedCharacter: {},
    };
  },
  getters: {
    getCharacters: (state) => state.characters,
    getSelectedCharacter: (state) => state.selectedCharacter,
  },
});

export default useCharacterStore;
