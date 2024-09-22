<template>
  <div>
    <h1>{{ rootBeer?.name }}</h1>
    <img v-for="picture in rootBeer?.Pictures" :key="picture.id" :src="'/' + picture.path" :alt="picture.name" />
    <p>{{ rootBeer?.description }}</p>

    <h3>Upload Image</h3>
    <form @submit.prevent="uploadImage">
      <input type="file" @change="handleFileChange" />
      <button type="submit">Upload Image</button>
    </form>

    <h2>Reviews (Total Count: {{ rootBeer?.reviewCount }}, Average Rating: {{ rootBeer?.reviewAverageRating?.toFixed(1) }})</h2>
    <ul v-if="reviews.length > 0">
      <li v-for="review in reviews" :key="review.id">
        <p>{{ review.rating }} stars by {{ review.user_name }}: {{ review.description }}</p>
      </li>
    </ul>
    <p v-else>No reviews yet.</p>

    <!-- Pagination Controls -->
    <div v-if="totalReviews > 0">
      <p>Page {{ pagination.page + 1 }} of {{ totalReviewPages }}</p>
      <button @click="goToPreviousPage" :disabled="pagination.page === 0">Previous</button>
      <button @click="goToNextPage" :disabled="pagination.page === totalReviewPages - 1">Next</button>
    </div>

    <h3>Add a Review</h3>
    <form @submit.prevent="submitReview">
      <input v-model="newReview.user_name" placeholder="User Name" />
      <input v-model="newReview.description" placeholder="Description" />
      <input v-model="newReview.rating" type="number" min="1" max="5" placeholder="Rating" />
      <button type="submit">Add Review</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRootBeerStore } from '@/stores/rootBeerStore';
import { useReviewStore } from '@/stores/reviewStore';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { uploadRootBeerImage } from '@/services/RootBeerService';

export default {
  setup() {
    const route = useRoute();
    const rootBeerStore = useRootBeerStore();
    const reviewStore = useReviewStore();
    const newReview = ref({ user_name: '', description: '', rating: 0 });
    const selectedFile = ref(null); // To hold the selected image file

    const { rootBeerDetails } = storeToRefs(rootBeerStore);
    const { reviews, pagination, total } = storeToRefs(reviewStore);

    onMounted(() => {
      rootBeerStore.fetchRootBeerDetails(route.params.id);
      reviewStore.setReviewPage(0);
      reviewStore.fetchReviews(route.params.id);
    });

    const submitReview = async () => {
      await reviewStore.submitReview(route.params.id, newReview.value);
      newReview.value = { user_name: '', description: '', rating: 0 };
      rootBeerStore.fetchRootBeerDetails(route.params.id);
      reviewStore.fetchReviews(route.params.id);
    };

    // Function to handle file input change
    const handleFileChange = (event) => {
      selectedFile.value = event.target.files[0];
    };

    // Function to upload the selected image
    const uploadImage = async () => {
      if (!selectedFile.value) {
        alert('Please select an image file');
        return;
      }
      const formData = new FormData();
      formData.append('file', selectedFile.value);

      try {
        await uploadRootBeerImage(route.params.id, formData);
        // After the upload, fetch the updated root beer details to show the new image
        await rootBeerStore.fetchRootBeerDetails(route.params.id);
        selectedFile.value = null; // Clear the file input
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };

    // Pagination logic
    const totalReviewPages = computed(() => {
      return Math.ceil(total.value / pagination.value.pageSize);
    });

    const goToPreviousPage = async () => {
      if (pagination.value.page > 0) {
        reviewStore.setReviewPage(pagination.value.page - 1);
        await reviewStore.fetchReviews(route.params.id); // Fetch reviews for the previous page
      }
    };

    const goToNextPage = async () => {
      if (pagination.value.page < totalReviewPages.value - 1) {
        reviewStore.setReviewPage(pagination.value.page + 1);
        await reviewStore.fetchReviews(route.params.id); // Fetch reviews for the next page
      }
    };

    return { rootBeer: rootBeerDetails, reviews, newReview, submitReview, handleFileChange, uploadImage, totalReviews: total, pagination, totalReviewPages, goToPreviousPage, goToNextPage };
  },
};
</script>

<style scoped>
img {
  height: 100px;
  width: auto;
}
</style>
