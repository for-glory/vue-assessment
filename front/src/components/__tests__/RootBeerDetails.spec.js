import { mount } from '@vue/test-utils';
import RootBeerDetails from '@/components/RootBeerDetails.vue';
import { createTestingPinia } from '@pinia/testing';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { nextTick } from 'vue';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { createRouterMock, injectRouterMock } from 'vue-router-mock';
import { useReviewStore } from '@/stores/reviewStore';
import { useRootBeerStore } from '@/stores/rootBeerStore';

const mockAxios = new MockAdapter(axios);

describe('RootBeerDetails.vue', () => {
  let wrapper;
  let routerMock;

  beforeEach(() => {
    // Reset Axios mock and create router mock
    mockAxios.reset();

    // Create a mocked router and set the route params
    routerMock = createRouterMock({
      initialRoute: '/rootbeer/1', // Mocked route
      spy: {
        create: fn => vi.fn(fn),
        reset: spy => spy.mockClear(),
      }
    });
    routerMock.setParams({ id: '1' }); // Set route params to simulate `route.params.id`

    // Inject the router mock into the testing environment
    injectRouterMock(routerMock);

    wrapper = mount(RootBeerDetails, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn, // Use vi.fn() for spying on actions
            initialState: {
              rootBeer: {
                rootBeerDetails: {
                  id: 1,
                  name: 'Test Root Beer',
                  description: 'This is a test root beer.',
                  Pictures: [{
                    path: 'test-image.jpg',
                  }],
                },
              },
              review: {
                reviews: [
                  { id: 1, rating: 5, description: 'Great root beer!' },
                  { id: 2, rating: 4, description: 'Pretty good.' },
                ],
                total: 2,
                pagination: {
                  page: 0,
                  pageSize: 5,
                },
              },
            },
          }),
        ],
      },
    });
  });

  it('renders root beer details', () => {
    expect(wrapper.text()).toContain('Test Root Beer');
    expect(wrapper.text()).toContain('This is a test root beer.');
    expect(wrapper.find('img').attributes('src')).toBe('/test-image.jpg');

    const rootBeerStore = useRootBeerStore();
    expect(rootBeerStore.fetchRootBeerDetails).toHaveBeenCalledWith('1');
  });

  it('fetches and renders reviews with pagination', async () => {
    // Check if reviews are rendered
    expect(wrapper.text()).toContain('Great root beer!');
    expect(wrapper.text()).toContain('Pretty good.');

    // Verify that the Pinia store's fetchReviews action was called
    const reviewStore = useReviewStore();
    expect(reviewStore.fetchReviews).toHaveBeenCalledWith('1');
  });
});
