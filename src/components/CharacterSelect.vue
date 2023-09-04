<template>
  <div class="select-holder">
    <v-select
      v-model="characterStore.selectedCharacter"
      label="Elige un personaje"
      :items="characterStore.characters"
      item-title="name"
      variant="outlined"
      @change="handleCharacterSelection"
    >
    </v-select>
  </div>
</template>

<script setup>
import { useCharacterStore } from "../stores/characterStore";
import { onMounted } from "vue";
import { mande } from "mande";

const characterStore = useCharacterStore();

const marvel = mande("https://gateway.marvel.com/v1/public", {
  apikey: import.meta.env.VITE_PUBLIC_KEY,
});

onMounted(async () => {
  try {
    const { data } = await marvel.get(
      `/characters?apikey=${import.meta.env.VITE_PUBLIC_KEY}`
    );
    characterStore.characters = data.results;
  } catch (error) {
    console.error(error);
  }
});

const handleCharacterSelection = (selectedValue) => {
  characterStore.selectedCharacter = selectedValue;
};
</script>

<style scoped>
.select-holder {
  padding: 40px;
}
</style>
