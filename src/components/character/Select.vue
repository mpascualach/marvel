<template>
  <div class="select-holder">
    <v-select
      v-model="characterStore.selectedCharacter"
      :items="characterStore.characters"
      item-title="name"
      item-value="id"
      variant="outlined"
      @update:modelValue="handleCharacterSelection"
    >
    </v-select>
    <v-text-field
      class="character-searcher"
      v-model="searchKeyword"
      placeholder="Busca o selecciona tu personaje"
      variant="outlined"
    ></v-text-field>
  </div>
  <p>{{ err }}</p>
</template>

<script setup>
import { useCharacterStore } from "@/stores/CharacterStore";
import { onMounted } from "vue";
import { mande } from "mande";
import { debounce } from "lodash";

const characterStore = useCharacterStore();

const marvel = mande("https://gateway.marvel.com/v1/public", {
  apikey: import.meta.env.VITE_PUBLIC_KEY,
});
let err, searchKeyword;

const searchCharactersDebounced = debounce(searchCharacters, 300);

onMounted(async () => {
  // iniciar listado de personajes - se limita a 20 por defecto en el API
  try {
    if (!searchKeyword) {
      const { data } = await marvel.get(
        `/characters?apikey=${import.meta.env.VITE_PUBLIC_KEY}`
      );
      characterStore.characters = data.results;
      console.log("Characters: ", data.results);
    }
  } catch (error) {
    err = error;
    console.error(error);
  }
});

const handleCharacterSelection = (selectedValue) => {
  const selectedChar = characterStore.characters.find(
    (char) => char.id === selectedValue
  );
  characterStore.selectedCharacter = selectedChar;
  // reseteando el entry - por si se había establecido antes
  characterStore.entrySelected = false;
};

const searchCharacters = async () => {
  try {
    const { data } = await marvel.get(
      `/characters?nameStartsWith=${searchKeyword}&apikey=${
        import.meta.env.VITE_PUBLIC_KEY
      }`
    );
  } catch (error) {
    err = error;
    console.log(error);
  }
};
</script>

<style scoped>
.select-holder {
  padding: 40px;
  padding-bottom: 10px;
  position: relative;
}

.character-searcher {
  position: absolute;
  width: 80%;
  top: 30%;
  left: 5%;
}
</style>
