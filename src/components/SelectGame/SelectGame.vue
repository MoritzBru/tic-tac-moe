<template>
  <section>
    <div class="flex flex-col">
      <label for="select-game__name">
        Create a game by smashing that button
      </label>
      <button
        class="mt-2 btn--success"
        @click="createGame"
      >
        <plusIcon />
        Create Game
      </button>
    </div>
    <p class="mt-6 mb-4 text-2xl font-bold text-center text-gray-700 uppercase sm:mt-12 sm:mb-8">
      or
    </p>
    <div class="flex flex-col">
      <label for="select-game__id">
        Join an existing game with a game ID from your friend
      </label>
      <input
        id="select-game__id"
        v-model="gameId"
        class="mt-2 input--warn"
        placeholder="ABC1234XYZ"
      >
      <button
        class="mt-4 btn--warn"
        @click="joinGame"
      >
        Join Game
        <arrowRightIcon />
      </button>
    </div>
  </section>
</template>

<script>
import { ref, unref } from 'vue';
import plusIcon from '@/assets/plus.svg';
import arrowRightIcon from '@/assets/arrow-right.svg';

const components = {
  plusIcon,
  arrowRightIcon,
};

export default {
  components,
  emits: [ 'create-game', 'join-game' ],
  setup(_props, { emit }) {
    const gameName = ref('');
    const gameId = ref('');

    function createGame() {
      emit('create-game');
    }

    function joinGame() {
      if (!gameId.value) return;
      const payload = {
        id: unref(gameId),
      };
      emit('join-game', payload);
    }

    return {
      gameName,
      gameId,
      createGame,
      joinGame,
    };
  },
};
</script>
