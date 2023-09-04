<template>
  <div class="select-holder">
    <v-select
      v-model="selectedCharacter"
      label="Elige un personaje"
      :items="characters"
      item-title="name"
      return-object
    >
    </v-select>
  </div>
</template>

<script>
import { mande } from "mande";
import { useCharacterStore } from "../stores/characterStore";

export default {
  setup() {
    const store = useCharacterStore();
    const characters = ref([]);
    const selectedCharacter = ref(store.selectedCharacter);
    const api = mande(
      `https://gateway.marvel.com:443/v1/public/characters?apikey=${this.apiKey}`
    );

    async function getCharacters() {
      try {
        const response = await api.get();
        characters.value = response.data.results;
      } catch (error) {
        console.error("Error fetching characters:", error);
        // algunas cosas aquí
      }
    }

    function selectCharacter(character) {
      store.selectedCharacter = character;
    }

    watch(
      () => store.selectedCharacter,
      (newCharacter) => {
        selectedCharacter.value = newCharacter;
      }
    );

    getCharacters();

    return {
      characters,
      selectedCharacter,
      setSelectedCharacter,
    };
  },
};
</script>

<style scoped>
.select-holder {
  padding: 40px;
}
</style>
