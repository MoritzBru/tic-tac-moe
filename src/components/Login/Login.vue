<template>
  <section>
    <div class="flex flex-col">
      <label for="login__username">
        Your name in the game
      </label>
      <input
        id="login__username"
        v-model="username"
        class="mt-2"
      >
      <button
        class="mt-4"
        @click="login"
      >
        Login
      </button>
    </div>
  </section>
</template>

<script>
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import { ref, unref } from 'vue';

export default {
  emits: ['login'],
  setup(_props, { emit }) {
    const randomName = uniqueNamesGenerator({
      dictionaries: [ adjectives, colors, animals ],
      separator: ' ',
      style: 'capital',
    });
    const username = ref(randomName);

    function login() {
      if (!username.value) return;
      const payload = {
        username: unref(username),
      };
      emit('login', payload);
    }

    return {
      username,
      login,
    };
  },
};
</script>
