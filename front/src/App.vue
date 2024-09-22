<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/add-rootbeer">Add Root Beer</RouterLink>
      <RouterLink to="/search">Search Root Beer</RouterLink>
    </nav>

    <RouterView></RouterView>
  </div>
</template>
