<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>

    <!-- Owners Section -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-2">House Owners (Reflecting Map Data)</h2>
      <div v-if="isLoadingOwners" class="text-center p-4">
        Loading owners...
      </div>
      <div v-else-if="errorLoadingOwners" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline"> {{ errorLoadingOwners }}</span>
      </div>
      <div v-else-if="owners.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <!-- This is the part that displays each owner -->
        <div 
          v-for="owner in owners" 
          :key="owner.id" 
          class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col justify-between min-h-[180px]"
        >
          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ owner.name }}</h3>
            <p class="text-sm text-gray-600 mb-1"><strong>Property:</strong> {{ owner.property }}</p>
            <p class="text-sm text-gray-600"><strong>Location:</strong> Lat: {{ owner.latitude.toFixed(4) }}, Long: {{ owner.longitude.toFixed(4) }}</p>
          </div>
          <!-- You could add a small action button or link here if needed -->
          <!-- <button class="mt-4 text-sm text-blue-500 hover:underline">View Details</button> -->
        </div>
      </div>
      <div v-else class="text-center p-4 text-gray-500">
        No owners found or data not yet loaded.
      </div>
    </div>

    <!-- Properties Section (currently static - you can apply similar styling) -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-2">Properties</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <!-- Example Property Card 1 -->
        <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out min-h-[150px]">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Property Alpha</h3>
          <p class="text-sm text-gray-600">Details about property Alpha...</p>
        </div>
        <!-- Example Property Card 2 -->
        <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out min-h-[150px]">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Property Beta</h3>
          <p class="text-sm text-gray-600">Details about property Beta...</p>
        </div>
      </div>
    </div>

    <!-- Financials Section (currently static - you can apply similar styling) -->
    <div>
      <h2 class="text-xl font-semibold mb-2">Financials</h2>
      <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <p class="text-gray-700">Financial summary or charts will go here...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const owners = ref([]);
const isLoadingOwners = ref(true);
const errorLoadingOwners = ref(null);

const fetchOwners = async () => {
  console.log('Dashboard: fetchOwners called');
  isLoadingOwners.value = true;
  errorLoadingOwners.value = null;
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    owners.value = [
      { id: 'mapOwner1', name: 'John Doe (from Map)', property: '123 Main St, Anytown', latitude: 34.0522, longitude: -118.2437 },
      { id: 'mapOwner2', name: 'Jane Smith (from Map)', property: '456 Oak Ave, Sometown', latitude: 34.0530, longitude: -118.2440 },
      { id: 'mapOwner3', name: 'Peter Jones (from Map)', property: '789 Pine Ln, Otherville', latitude: 34.0540, longitude: -118.2450 },
    ];
    console.log('Dashboard: Owners data loaded (simulated map data)', owners.value);
  } catch (error) {
    console.error('Dashboard: Error fetching owners:', error);
    errorLoadingOwners.value = 'Failed to load owner information.';
  } finally {
    isLoadingOwners.value = false;
  }
};

onMounted(() => {
  console.log('Dashboard: Component Mounted. Fetching owners...');
  fetchOwners();
});

onUnmounted(() => {
  console.log('Dashboard: Component Unmounted.');
});

</script>

<style scoped>
/* Scoped styles for the dashboard */
/* You can add custom styles here if Tailwind isn't enough, but try to use Tailwind first */
</style>
