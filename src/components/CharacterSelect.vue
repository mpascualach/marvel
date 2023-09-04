<template>
  <div>
    <select v-model="selectedCharacter">
      <option value="Elige un personaje" disabled></option>
      <option
        v-for="character in characters"
        :key="character.id"
        :value="character.name"
      ></option>
    </select>
  </div>
  <template> </template>
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
        console.log(response);
        const characters = response.json();
        console.log(characters);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    },
  },
};
</script>
