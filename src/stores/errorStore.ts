import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useErrorStore = defineStore('error', () => {
  const error = ref<string | null>(null);

  function setError(errorMessage: string) {
    error.value = errorMessage;
  }

  function getError() {
    return error.value;
  }

  return { setError, getError };
});
