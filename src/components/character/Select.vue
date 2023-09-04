<template>
  <div class="select-holder">
    <v-select
      v-model="characterStore.selectedCharacter"
      label="Elige un personaje"
      :items="characterStore.characters"
      item-title="name"
      variant="solo"
      @update:modelValue="handleCharacterSelection"
    >
    </v-select>
  </div>
</template>

<script setup>
import { useCharacterStore } from "@/stores/CharacterStore";
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
  const selectedChar = characterStore.characters.find(
    (char) => char.name === selectedValue
  );
  characterStore.selectedCharacter = selectedChar;
  // reseteando el entry - por si se había establecido antes
  characterStore.entrySelected = false;
};
</script>

<style scoped>
.select-holder {
  padding: 40px;
  padding-bottom: 10px;
}
</style>
