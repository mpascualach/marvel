<template>
  <div class="select-holder">
    <v-select
      class="character-select"
      :items="characterStore.characters"
      item-title="name"
      item-value="id"
      variant="outlined"
      @update:modelValue="handleCharacterSelection"
    >
    </v-select>
    <div class="character-searcher">
      <v-text-field
        v-model="searchKeyword"
        :placeholder="
          characterStore.selectedCharacter
            ? characterStore.selectedCharacter.name
            : 'Busca o selecciona tu personaje'
        "
        variant="outlined"
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
import { onMounted, watch } from "vue";
import { mande } from "mande";
import { debounce } from "lodash";

const characterStore = useCharacterStore();

const marvel = mande("https://gateway.marvel.com/v1/public", {
  apikey: import.meta.env.VITE_PUBLIC_KEY,
});
let searchKeyword = "";

const searchCharacters = async () => {
  try {
    const { data } = await marvel.get(
      `/characters?nameStartsWith=${searchKeyword}&apikey=${
        import.meta.env.VITE_PUBLIC_KEY
      }`
    );
    characterStore.characters = data.results;
    console.log("Characters: ", characterStore.characters);
    searchKeyword = "";
  } catch (error) {
    err = error;
    console.log(error);
  }
};

const searchCharactersDebounced = debounce(searchCharacters, 300);

const handleCharacterSelection = (selectedValue) => {
  const selectedChar = characterStore.characters.find(
    (char) => char.id === selectedValue
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

.v-select .v-select__selection {
  position: absolute;
  top: 0;
  bottom: -10%;
}
</style>
