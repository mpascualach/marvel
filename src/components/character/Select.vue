<template>
  <div class="select-holder">
    <v-select
      class="character-select"
      v-model="characterStore.selectedCharacter"
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
        placeholder="Busca o selecciona tu personaje"
        variant="outlined"
      ></v-text-field>
      <div class="characters-counter">
        <p>{{ characterStore.characters.length }}</p>
      </div>
    </div>
  </div>
  <p>{{ err }}</p>
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
let err, searchKeyword;

// const getInitialListOfCharacters = async () => {
//   try {
//     const { data } = await marvel.get(
//       `/characters?apikey=${import.meta.env.VITE_PUBLIC_KEY}`
//     );
//     characterStore.characters = data.results;
//   } catch (error) {
//     err = error;
//     console.error(error);
//   }
// };

const searchCharacters = async () => {
  console.log(searchKeyword);
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

const searchCharactersDebounced = debounce(searchCharacters, 300);

watch(searchKeyword, () => {
  console.log("Watching searchKeyword: ", searchKeyword);
  if (searchKeyword.length > 0) {
    searchCharactersDebounced();
  } else {
    characterStore.characters = [];
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
