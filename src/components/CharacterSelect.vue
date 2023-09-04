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
import { ref, watch } from "vue";

export default {
  setup() {
    const characterStore = useCharacterStore();
    const characters = ref([]);
    // const selectedCharacter = ref(characterStore.selectedCharacter);
    const apiKey = import.meta.env.VITE_PUBLIC_KEY;

    const api = mande(
      `https://gateway.marvel.com:443/v1/public/characters?apikey=${apiKey}`
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

    // function selectCharacter(character) {
    //   characterStore.selectedCharacter = character;
    // }

    // watch(
    //   () => characterStore.selectedCharacter,
    //   (newCharacter) => {
    //     selectedCharacter.value = newCharacter;
    //   }
    // );

    getCharacters();

    // return {
    //   characters,
    //   selectedCharacter,
    //   setSelectedCharacter,
    // };
  },
};
</script>

<style scoped>
.select-holder {
  padding: 40px;
}
</style>
