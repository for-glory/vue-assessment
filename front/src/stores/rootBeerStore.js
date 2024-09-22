import { defineStore } from 'pinia';
import { getRecentRootBeers, getRootBeerDetails, addRootBeer } from '@/services/RootBeerService';

export const useRootBeerStore = defineStore('rootBeer', {
  state: () => ({
    rootBeers: [],
    rootBeerDetails: null,
  }),

  actions: {
    async fetchRootBeers() {
      try {
        const response = await getRecentRootBeers();
        this.rootBeers = response.data.items;
      } catch (error) {
        console.error('Error fetching root beers:', error);
      }
    },

    async fetchRootBeerDetails(id) {
      try {
        const response = await getRootBeerDetails(id);
        this.rootBeerDetails = response.data;
      } catch (error) {
        console.error('Error fetching root beer details:', error);
      }
    },

    async addNewRootBeer(rootBeer) {
      try {
        await addRootBeer(rootBeer);
        this.fetchRootBeers(); // refresh the list of root beers
      } catch (error) {
        console.error('Error adding new root beer:', error);
      }
    }
  }
});
