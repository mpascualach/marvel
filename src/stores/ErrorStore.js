import { defineStore } from "pinia";
import { ref } from "vue";

export const useErrorStore = defineStore("ErrorStore", () => {
  const errorText = ref(null);
});

export default useErrorStore;
