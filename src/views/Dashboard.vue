<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>

    <!-- Owners Section -->
    <div class="mb-8">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-xl font-semibold">House Owners (Reflecting Map Data)</h2>
        <!-- Responsive Refresh Button -->
        <button
          @click="refreshOwners"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
          :disabled="isLoadingOwners"
          aria-label="Refresh owners from map"
        >
          <span v-if="isLoadingOwners">Refreshing...</span>
          <span v-else>Refresh Owners</span>
        </button>
      </div>
      <!-- Summary data row -->
      <div v-if="ownerSummary.totalOwners > 0" class="flex flex-wrap gap-4 mb-4">
        <div class="bg-gray-100 p-2 rounded">Total Owners: {{ ownerSummary.totalOwners }}</div>
        <div class="bg-gray-100 p-2 rounded">Total Properties: {{ ownerSummary.totalProperties }}</div>
        <div class="bg-gray-100 p-2 rounded">Total Value: ${{ ownerSummary.totalValue.toLocaleString() }}</div>
      </div>

      <div v-if="isLoadingOwners" class="text-center p-4">
        Loading owners...
      </div>
      <div v-else-if="errorLoadingOwners" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline"> {{ errorLoadingOwners }}</span>
      </div>
      <div v-else-if="owners.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- This is the part that displays each owner -->
        <div v-for="owner in owners" :key="owner.name" class="bg-white p-4 rounded shadow">
          <h3 class="font-bold">{{ owner.name }}</h3>
          <p><strong>Total Properties:</strong> {{ owner.properties.length }}</p>
          <p><strong>Total Value:</strong> ${{ owner.totalValue.toLocaleString() }}</p>
          <p><strong>Addresses:</strong></p>
          <ul class="ml-4 list-disc">
            <li v-for="property in owner.properties" :key="property.address">
              {{ property.address }}
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="text-center p-4">
        No owners found or data not yet loaded.
      </div>
      <!-- Include MapView component -->
      <MapView @properties-updated="onPropertiesFromMap"/>
    </div>

    <!-- Properties Section (currently static) -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-2">Properties</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Property Card 1 -->
        <div class="bg-white p-4 rounded shadow">
          <h3 class="font-bold">Property 1</h3>
          <p>Details about property 1...</p>
        </div>
        <!-- Property Card 2 -->
        <div class="bg-white p-4 rounded shadow">
          <h3 class="font-bold">Property 2</h3>
          <p>Details about property 2...</p>
        </div>
      </div>
    </div>

    <!-- Financials Section (currently static) -->
    <div>
      <h2 class="text-xl font-semibold mb-2">Financials</h2>
      <div class="bg-white p-4 rounded shadow">
        <p>Financial summary or charts...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import MapView from '../components/MapView.vue';

const owners = ref([]);
const isLoadingOwners = ref(true);
const errorLoadingOwners = ref(null);
const propertyData = ref([]);

// Owner summary for quick stats
const ownerSummary = ref({
  totalOwners: 0,
  totalProperties: 0,
  totalValue: 0
});

// Refresh owners data from map
function refreshOwners() {
  console.log('Dashboard: refreshOwners called');
  isLoadingOwners.value = true;
  errorLoadingOwners.value = null;
  
  // In a real app, this would trigger the MapView to emit current data
  setTimeout(() => {
    if (propertyData.value.length > 0) {
      processMapProperties(propertyData.value);
      isLoadingOwners.value = false;
    } else {
      errorLoadingOwners.value = "No map data available";
      isLoadingOwners.value = false;
    }
  }, 400);
}

// Accept data emitted from MapView component
function onPropertiesFromMap(properties) {
  console.log('Dashboard: Received properties from map', properties);
  propertyData.value = properties;
  processMapProperties(properties);
}

function processMapProperties(properties) {
  // Process property data to group by owner
  const ownersHash = {};
  let totalProperties = 0;
  let totalValue = 0;

  properties.forEach(prop => {
    const ownerName = prop.owner || 'Unknown Owner';
    if (!ownersHash[ownerName]) {
      ownersHash[ownerName] = {
        name: ownerName,
        totalValue: 0,
        properties: []
      };
    }
    ownersHash[ownerName].totalValue += prop.value || 0;
    ownersHash[ownerName].properties.push(prop);
    totalProperties++;
    totalValue += prop.value || 0;
  });
  
  owners.value = Object.values(ownersHash);
  ownerSummary.value.totalOwners = owners.value.length;
  ownerSummary.value.totalProperties = totalProperties;
  ownerSummary.value.totalValue = totalValue;
  
  isLoadingOwners.value = false;
  console.log('Dashboard: Processed map data into owners', owners.value);
}

// Initial data fetch
const fetchInitialData = async () => {
  console.log('Dashboard: fetchInitialData called');
  isLoadingOwners.value = true;
  errorLoadingOwners.value = null;
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulated property data with owner, value, and address information
    const simulatedProperties = [
      { id: 'prop1', owner: 'John Doe', address: '123 Main St, Anytown', value: 450000, latitude: 34.0522, longitude: -118.2437 },
      { id: 'prop2', owner: 'John Doe', address: '124 Main St, Anytown', value: 520000, latitude: 34.0523, longitude: -118.2438 },
      { id: 'prop3', owner: 'Jane Smith', address: '456 Oak Ave, Sometown', value: 380000, latitude: 34.0530, longitude: -118.2440 },
      { id: 'prop4', owner: 'Peter Jones', address: '789 Pine Ln, Otherville', value: 620000, latitude: 34.0540, longitude: -118.2450 },
      { id: 'prop5', owner: 'Peter Jones', address: '790 Pine Ln, Otherville', value: 580000, latitude: 34.0541, longitude: -118.2451 },
    ];
    
    propertyData.value = simulatedProperties;
    processMapProperties(simulatedProperties);
    
  } catch (error) {
    console.error('Dashboard: Error fetching initial data:', error);
    errorLoadingOwners.value = 'Failed to load owner information.';
    isLoadingOwners.value = false;
  }
};

onMounted(() => {
  console.log('Dashboard: Component Mounted. Fetching initial data...');
  fetchInitialData();
});

onUnmounted(() => {
  console.log('Dashboard: Component Unmounted.');
});
</script>

<style scoped>
/* Scoped styles for the dashboard */
button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
