<template>
  <div class="select-holder">
    <v-select
      class="character-select"
      :items="characterStore.characters"
      item-title="name"
      item-value="id"
      variant="solo"
      @update:modelValue="handleCharacterSelection"
      :menu-props="{ openOnClear: characterStore.characters.length > 0 }"
    >
    </v-select>
    <div class="character-searcher">
      <v-text-field
        v-model="characterStore.searchedCharacter"
        :placeholder="
          characterStore.selectedCharacter
            ? characterStore.selectedCharacter.name
            : 'Busca o selecciona tu personaje'
        "
        variant="solo"
        @update:modelValue="searchCharacters"
      ></v-text-field>
      <div class="characters-counter">
        <p>{{ characterStore.characters.length }}</p>
      </div>
    </div>
  </div>
  <!-- <p>{{ err }}</p> -->
</template>

<script setup>
import { useCharacterStore } from "@/stores/CharacterStore";
import useErrorStore from "@/stores/ErrorStore";
import { mande } from "mande";

// registro de los stores
const characterStore = useCharacterStore();
const errorStore = useErrorStore();

// aqui se acceded al api
const marvel = mande("https://gateway.marvel.com/v1/public", {
  apikey: import.meta.env.VITE_PUBLIC_KEY,
});
let searchKeyword = "";

const searchCharacters = async () => {
  // estoy dejando el limite por ahora a 20
  try {
    const { data } = await marvel.get(
      `/characters?nameStartsWith=${searchKeyword}&apikey=${
        import.meta.env.VITE_PUBLIC_KEY
      }`
    );
    // llenando listado de personajes
    characterStore.characters = data.results;
    // reseteando keyword
    searchKeyword = "";
  } catch (error) {
    errorStore.errorText = error.message;
  }
};

const handleCharacterSelection = (selectedValue) => {
  const selectedChar = characterStore.characters.find(
    (char) => char.id === selectedValue
  );
  characterStore.selectedCharacter = selectedChar;
  characterStore.searchedCharacter = selectedChar;
  // reseteando el entry - por si se había establecido antes
  characterStore.entrySelected = false;
};
</script>

<style scoped>
.select-holder {
  padding: 40px;
  padding-bottom: 10px;
  position: relative;
}

.character-select {
  height: 100px;
}

.v-select input {
  border-width: 2px; /* Adjust the desired border width */
}

.character-searcher {
  position: absolute;
  width: 80%;
  top: 30%;
  left: 5%;
}

.characters-counter {
  position: absolute;
  top: 20%;
  right: -5%;
}
</style>
