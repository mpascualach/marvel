<template>
  <v-card class="character-card">
    <div class="character-details">
      <h2 class="character-title">
        {{ character.name }}
      </h2>
      <p class="character-description">
        {{
          character.description || "Este personaje es un misterio completo..."
        }}
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

<style scoped>
.character-card {
  height: 100%;
}
.character-img-container {
  height: 250px;
  border-radius: 10px;
  position: relative;
  margin: 20px;
  align-self: flex-start;
}

.character-img {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.character-title {
  font-size: 1.5rem;
  margin-top: 0;
}

.character-details {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 70%;
}

.character-description {
  text-align: justify;
}
.comic-selector {
  display: flex;
}

.comic-selector > .v-select {
  margin: 10px;
}
</style>
