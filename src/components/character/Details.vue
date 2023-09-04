<template>
  <v-card class="character-card">
    <div class="character-details">
      <h2 class="character-title">
        {{ character.name }}
      </h2>
      <p class="character-description">
        {{ character.description }}
      </p>
    </div>
    <div class="character-img-container">
      <img
        class="character-img"
        :src="`${character.thumbnail.path}.${character.thumbnail.extension}`"
      />
    </div>
  </v-card>
</template>

<script setup>
import { defineProps, watch } from "vue";

const props = defineProps({
  character: Object, // Specify the prop type here
});

watch(props.character, (newCharacter, oldCharacter) => {
  console.log("Character prop changed:", newCharacter, oldCharacter);
});
</script>
