import { createPinia } from "pinia";

const pinia = createPinia();

export const useCharacterStore = pinia.createStore({
  state: () => ({
    selectedCharacter: null,
  }),
  actions: {
    setSelectedCharacter(character) {
      this.selectedCharacter = character;
    },
  },
});

export default useCharacterStore;
