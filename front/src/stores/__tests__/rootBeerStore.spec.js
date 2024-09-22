import { setActivePinia, createPinia } from 'pinia';
import { useRootBeerStore } from '@/stores/rootBeerStore';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { describe, beforeEach, it, expect } from 'vitest';

const mockAxios = new MockAdapter(axios);

describe('rootBeerStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    mockAxios.reset();
  });

  it('fetches root beer details successfully', async () => {
    const rootBeerStore = useRootBeerStore();

    const mockRootBeer = {
      id: 1,
      name: 'Root Beer Test',
      description: 'A delicious root beer',
    };

    mockAxios.onGet('/api/drinks/1').reply(200, mockRootBeer);

    await rootBeerStore.fetchRootBeerDetails(1);

    expect(rootBeerStore.rootBeerDetails).toEqual(mockRootBeer);
  });
});
