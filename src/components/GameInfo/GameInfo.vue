<template>
  <header
    v-if="userName || gameId"
    class="flex flex-col gap-3 mb-8 sm:flex-row sm:justify-between"
  >
    <div v-if="userName">
      <p class="text-gray-600 select-none">
        Username
      </p>
      <code class="px-2 py-1 font-mono text-gray-200 bg-gray-700 rounded">{{ userName }}</code>
      <UnitSymbol
        :unit="unit"
        class="inline-block ml-2 text-2xl"
      />
    </div>
    <div v-if="gameId">
      <p class="text-gray-600 select-none sm:text-right">
        GameID
      </p>
      <code class="px-2 py-1 font-mono text-gray-200 bg-gray-700 rounded sm:text-right">{{ gameId }}</code>
    </div>
  </header>
</template>

<script>
import UnitSymbol from '@/components/UnitSymbol/UnitSymbol.vue';

const components = {
  UnitSymbol,
};

const props = {
  userName: String,
  gameId: String,
  unit: String,
};

export default {
  components,
  props,
};
</script>
