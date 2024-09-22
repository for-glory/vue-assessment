import { defineStore } from 'pinia';
import { searchRootBeer } from '@/services/RootBeerService';

export const useSearchStore = defineStore('search', {
  state: () => ({
    searchResults: [],
    total: 0,
    searchParams: {
      name: '',
      description: '',
      minRating: null,
      maxRating: null,
      page: 0,
      pageSize: 5,
    },
  }),

  actions: {
    async searchRootBeers() {
      try {
        const response = await searchRootBeer(this.searchParams);
        this.searchResults = response.data.items;
        this.total = response.data.total;
      } catch (error) {
        console.error('Error searching for root beers:', error);
      }
    },

    setSearchParams(params) {
      this.searchParams = { ...this.searchParams, ...params };
    },

    setPage(page) {
      this.searchParams.page = page;
    },

    setPageSize(pageSize) {
      this.searchParams.pageSize = pageSize;
    },

    clearSearchParams() {
      this.searchParams = {
        name: '',
        description: '',
        minRating: null,
        maxRating: null,
        page: 0,
        pageSize: 5,
      };
      this.searchResults = [];
      this.total = 0;
    },
  },
});
