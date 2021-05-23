<template>
  <section>
    <div
      v-if="board"
      class="border-gray-600"
    >
      <div
        v-for="row in board"
        :key="row.id"
        class="flex"
      >
        <div
          v-for="tile in row.tiles"
          :key="tile.id"
          class="flex items-center justify-center flex-1 h-24 p-2 text-6xl border-2 border-gray-600 cursor-pointer hover:bg-gray-200"
          :class="{'cursor-not-allowed': nextMove !== unit || tile.value}"
          @click="updateTile(row.id, tile.id)"
        >
          <UnitSymbol
            :unit="tile.value"
          />
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between mt-4">
      <div class="flex items-center gap-2">
        Next move
        <UnitSymbol
          :unit="nextMove"
          class="text-2xl"
        />
      </div>
      <button
        class="btn--warn"
        @click="resetBoard"
      >
        <trashIcon />
        Reset Board
      </button>
    </div>
  </section>
</template>


<script>
import { klona } from 'klona';
import trashIcon from '@/assets/trash.svg';
import defaultBoard from '@/board.js';
import UnitSymbol from '@/components/UnitSymbol/UnitSymbol.vue';

const components = {
  UnitSymbol,
  trashIcon,
};

const props = {
  board: Array,
  unit: String,
  nextMove: String,
};

export default {
  components,
  props,
  emits: [ 'board-updated', 'setupDbListener' ],
  setup(props, { emit }) {

    function updateTile(rowId, tileId) {
      if (props.nextMove !== props.unit) return;
      try {
        const newBoard = klona(props.board);
        newBoard
          .find((row) => (row.id === rowId))
          .tiles
          .find((tile) => tile.id === tileId)
          .value ||= props.unit;

        const payload = {
          newBoard: newBoard,
        };
        emit('board-updated', payload);
      } catch (error) {
        console.error(error);
      }
    }

    function resetBoard() {
      const payload = {
        newBoard: defaultBoard,
      };
      emit('board-updated', payload);
    }

    return {
      updateTile,
      resetBoard,
    };
  },
};
</script>
