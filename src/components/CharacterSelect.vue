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

export default {
  data() {
    return {
      characters: [],
      selectedCharacter: "",
      apiKey: import.meta.env.VITE_PUBLIC_KEY,
    };
  },
  mounted() {
    this.getCharacters();
  },
  methods: {
    async getCharacters() {
      const api = mande(
        `https://gateway.marvel.com:443/v1/public/characters?apikey=${this.apiKey}`
      );
      try {
        const response = await api.get();
        this.characters = response.data.results;
      } catch (error) {
        console.error("Error fetching characters:", error);
        // algunas cosas aquí
      }
    },
  },
};
</script>

<style scoped>
.select-holder {
  padding: 40px;
}
</style>
