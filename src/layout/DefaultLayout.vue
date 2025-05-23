<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Navbar or Header (optional) -->
      <!-- <Navbar /> -->

      <!-- Page Content -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
        <router-view /> <!-- This is where your routed components (Home, Dashboard, Owners) will be displayed -->
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './sidebar.vue'; // Assuming your sidebar component is named sidebar.vue and is in the same directory
// import Navbar from './Navbar.vue'; // If you have a Navbar component
</script>

<style scoped>
/* Scoped styles for the DefaultLayout */
</style>