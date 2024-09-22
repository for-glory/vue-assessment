<template>
  <div>
    <h1>Add a Root Beer</h1>
    <form @submit.prevent="submitRootBeer" class="flex-column align-items-start">
      <input v-model="newRootBeer.name" placeholder="Name" />
      <textarea v-model="newRootBeer.description" placeholder="Description"></textarea>
      <button type="submit">Add Root Beer</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRootBeerStore } from '@/stores/rootBeerStore';

export default {
  setup() {
    const newRootBeer = ref({ name: '', description: '' });
    const rootBeerStore = useRootBeerStore();

    const submitRootBeer = async () => {
      await rootBeerStore.addNewRootBeer(newRootBeer.value);
      newRootBeer.value = { name: '', description: '' };
    };

    return { newRootBeer, submitRootBeer };
  },
};
</script>
