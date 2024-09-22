import { defineStore } from 'pinia';
import { addRootBeerReview, getRootBeerReviews } from '@/services/RootBeerService';

export const useReviewStore = defineStore('review', {
  state: () => ({
    reviews: [],
    total: 0,
    pagination: {
      page: 0,
      pageSize: 5,
    },
  }),

  actions: {
    async fetchReviews(id) {
      try {
        const { page, pageSize } = this.pagination;
        const response = await getRootBeerReviews(id, page, pageSize);
        this.reviews = response.data.items;
        this.total = response.data.total;
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    },

    async submitReview(rootBeerId, review) {
      try {
        await addRootBeerReview(rootBeerId, review);
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    },

    setReviewPage(page) {
      this.pagination.page = page;
    },

    setReviewPageSize(pageSize) {
      this.pagination.pageSize = pageSize;
    },
  }
});
