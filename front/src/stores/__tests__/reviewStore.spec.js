import { setActivePinia, createPinia } from 'pinia';
import { useReviewStore } from '@/stores/reviewStore';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { describe, beforeEach, it, expect } from 'vitest';

const mockAxios = new MockAdapter(axios);

describe('reviewStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    mockAxios.reset();
  });

  it('fetches paginated reviews successfully', async () => {
    const reviewStore = useReviewStore();

    const mockReviews = {
      items: [
        { id: 1, rating: 5, description: 'Great!' },
        { id: 2, rating: 4, description: 'Good.' },
      ],
      total: 10,
    };

    mockAxios.onGet('/api/drinks/1/reviews?offset=0&length=5').reply(200, mockReviews);

    await reviewStore.fetchReviews(1);

    expect(reviewStore.reviews).toEqual(mockReviews.items);
    expect(reviewStore.total).toBe(mockReviews.total);
  });
});
