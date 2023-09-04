<template>
  <v-app>
    <v-main>
      <!-- <HelloWorld /> -->
      <CharacterSelect />
      <p>Selected character: {{ selectedCharacter }}</p>
    </v-main>
  </v-app>
</template>

<script setup>
import HelloWorld from "@/components/HelloWorld.vue";
import CharacterSelect from "./components/CharacterSelect.vue";
import { useCharacterStore } from "./stores/characterStore";
import { ref, watch } from "vue";
</script>
