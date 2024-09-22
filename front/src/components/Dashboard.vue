<template>
  <div>
    <h1>Recently Added Root Beers</h1>
    <ul>
      <li v-for="rootBeer in rootBeers" :key="rootBeer.id">
        <router-link :to="`/rootbeer/${rootBeer.id}`">{{ rootBeer.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { useRootBeerStore } from '@/stores/rootBeerStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

export default {
  setup() {
    const rootBeerStore = useRootBeerStore();

    const { rootBeers } = storeToRefs(rootBeerStore);

    onMounted(() => {
      rootBeerStore.fetchRootBeers();
    });

    return { rootBeers };
  },
};
</script>
