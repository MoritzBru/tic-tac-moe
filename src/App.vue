<template>
  <GameInfo
    :user-name="user?.name"
    :game-id="activeGame?.id"
    :unit="unit"
  />
  <Login
    v-if="!user"
    @login="handleLogin"
  />
  <SelectGame
    v-if="user && !activeGame"
    @create-game="handleCreateGame"
    @join-game="handleJoinGame"
  />
  <GameBoard
    v-if="user && activeGame"
    :board="activeGame.board"
    :unit="unit"
    :next-move="activeGame.nextMove"
    @board-updated="handleBoardUpdated"
  />
</template>

<script>
import GameInfo from '@/components/GameInfo/GameInfo.vue';
import Login from '@/components/Login/Login.vue';
import SelectGame from '@/components/SelectGame/SelectGame.vue';
import GameBoard from '@/components/GameBoard/GameBoard.vue';
import board from '@/board.js';
import firebase from 'firebase/app';
import { ref, unref, computed } from 'vue';
import { nanoid } from 'nanoid';
import { klona } from 'klona';

const NEXT_MOVE_LOOKUP = {
  'x': 'o',
  'o': 'x',
};

const components = {
  GameInfo,
  Login,
  SelectGame,
  GameBoard,
};

export default {
  components,
  setup() {

    // users

    const user = ref(null);
    const allUsers = ref([]);

    firebase.database()
      .ref('users')
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          allUsers.value = snapshot.val();
        }
      });

    function handleLogin({ username }) {
      const existingUser = allUsers.value.find((usr) => usr.name === username);
      if (existingUser) {
        user.value = existingUser;
        return;
      }
      const newUser = {
        name: username,
        id: nanoid(10),
      };
      user.value = newUser;
      firebase.database()
        .ref('users')
        .set([ ...allUsers.value, newUser ]);
    }

    // game

    const activeGame = ref(null);
    const unit = computed(() => (activeGame.value?.creator === user.value?.name) ? 'x' : 'o');

    function handleCreateGame() {
      const id = nanoid(10);
      const newGame = {
        id,
        creator: user.value.name,
        board,
        nextMove: 'x',
      };
      firebase.database()
        .ref(`/games/${id}`)
        .set(newGame);
      activeGame.value = newGame;
      handleJoinGame({ id });
    }

    function handleJoinGame({ id }) {
      firebase.database()
        .ref(`/games/${id}`)
        .on('value', (snapshot) => {
          if (snapshot.val()) {
            activeGame.value = snapshot.val();
          }
        });
    }

    function handleBoardUpdated({ newBoard }) {
      const newGame = klona(unref(activeGame));
      newGame.board = newBoard;
      newGame.nextMove = NEXT_MOVE_LOOKUP[unit.value];
      firebase.database()
        .ref(`/games/${newGame.id}`)
        .set(newGame);
    }

    return {
      user,
      allUsers,
      activeGame,
      unit,
      handleLogin,
      handleCreateGame,
      handleJoinGame,
      handleBoardUpdated,
    };
  },
};
</script>
