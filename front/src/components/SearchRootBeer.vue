<template>
  <div>
    <h1>Search Root Beers</h1>
    <form @submit.prevent="submitSearch">
      <div>
        <label for="name">Name: </label>
        <input id="name" v-model="searchParams.name" placeholder="Root Beer Name" />
      </div>
      <div>
        <label for="description">Description: </label>
        <input id="description" v-model="searchParams.description" placeholder="Root Beer Description" />
      </div>
      <div>
        <label for="minRating">Minimum Rating: </label>
        <input id="minRating" type="number" v-model.number="searchParams.minRating" placeholder="Min Rating" min="1" max="5" />
      </div>
      <div>
        <label for="maxRating">Maximum Rating: </label>
        <input id="maxRating" type="number" v-model.number="searchParams.maxRating" placeholder="Max Rating" min="1" max="5" />
      </div>
      <button type="submit">Search</button>
      <button type="button" @click="clearSearch">Clear Search</button>
    </form>

    <ul v-if="searchResults.length > 0">
      <li v-for="rootBeer in searchResults" :key="rootBeer.id">
        <router-link :to="`/rootbeer/${rootBeer.id}`">{{ rootBeer.name }} - {{ rootBeer.reviewAverageRating?.toFixed(1) || 'No' }} stars</router-link>
      </li>
    </ul>
    <p v-else>No results found.</p>

    <!-- Pagination Controls -->
    <div v-if="total > 0">
      <p>Page {{ searchParams.page + 1 }} of {{ totalPages }}</p>
      <button @click="goToPreviousPage" :disabled="searchParams.page === 0">Previous</button>
      <button @click="goToNextPage" :disabled="searchParams.page === totalPages - 1">Next</button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useSearchStore } from '@/stores/searchStore';
import { storeToRefs } from 'pinia';

export default {
  setup() {
    const searchStore = useSearchStore();
    const { searchResults, searchParams, total } = storeToRefs(searchStore);

    const submitSearch = () => {
      searchStore.setPage(0);
      searchStore.searchRootBeers();
    };

    const clearSearch = () => {
      searchStore.clearSearchParams();
    };

    const goToPreviousPage = () => {
      if (searchStore.searchParams.page > 0) {
        searchStore.setPage(searchStore.searchParams.page - 1);
        searchStore.searchRootBeers(); // Fetch new results for the previous page
      }
    };

    const goToNextPage = () => {
      if (searchStore.searchParams.page < totalPages.value - 1) {
        searchStore.setPage(searchStore.searchParams.page + 1);
        searchStore.searchRootBeers(); // Fetch new results for the next page
      }
    };

    const totalPages = computed(() => {
      return Math.ceil(searchStore.total / searchStore.searchParams.pageSize);
    });

    return {
      searchParams,
      searchResults,
      total,
      totalPages,
      submitSearch,
      clearSearch,
      goToPreviousPage,
      goToNextPage,
    };
  },
};
</script>

<style scoped>
form {
  margin-bottom: 20px;
}

form div {
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}
</style>
