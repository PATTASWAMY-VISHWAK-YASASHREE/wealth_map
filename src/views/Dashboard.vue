<template>
  <div class="p-4 bg-slate-50 min-h-[100vh]">
    <h1 class="text-3xl font-bold mb-8">Dashboard</h1>

    <!-- Owners Section -->
    <div class="mb-8">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-2xl font-semibold">House Owners (Reflecting Map Data)</h2>
        <!-- API Endpoint Toggle -->
        <div class="flex items-center space-x-2">
          <label for="apiTarget" class="text-sm font-medium">API:</label>
          <select v-model="apiTarget" id="apiTarget" class="border p-1 rounded">
            <option value="local">Localhost</option>
            <option value="netlify">Netlify</option>
          </select>
          <button
            @click="fetchOwners"
            class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded shadow"
          >Refresh</button>
        </div>
      </div>

      <!-- Owners Summary Cards -->
      <div v-if="owners.length" class="flex gap-6 flex-wrap mb-4">
        <div class="bg-white rounded-xl shadow border p-4 flex flex-col items-center min-w-[140px]">
          <div class="text-base mb-1 text-slate-500">Total Owners</div>
          <div class="text-xl font-bold text-blue-700">{{ summary.totalOwners }}</div>
        </div>
        <div class="bg-white rounded-xl shadow border p-4 flex flex-col items-center min-w-[140px]">
          <div class="text-base mb-1 text-slate-500">Total Properties</div>
          <div class="text-xl font-bold text-green-700">{{ summary.totalProperties }}</div>
        </div>
        <div class="bg-white rounded-xl shadow border p-4 flex flex-col items-center min-w-[140px]">
          <div class="text-base mb-1 text-slate-500">Avg. Latitude</div>
          <div class="text-lg font-mono text-gray-800">{{ summary.avgLatitude || "--" }}</div>
        </div>
        <div class="bg-white rounded-xl shadow border p-4 flex flex-col items-center min-w-[140px]">
          <div class="text-base mb-1 text-slate-500">Avg. Longitude</div>
          <div class="text-lg font-mono text-gray-800">{{ summary.avgLongitude || "--" }}</div>
        </div>
      </div>
      
      <div v-if="isLoadingOwners" class="text-center p-6">
        <span class="text-blue-500">Loading owners...</span>
      </div>
      <div v-else-if="errorLoadingOwners" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
        <strong class="font-bold">Error: </strong> <span>{{ errorLoadingOwners }}</span>
      </div>
      <div v-else-if="owners.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-6">
        <div
          v-for="owner in owners"
          :key="owner.id"
          class="bg-white rounded-xl shadow-md transition hover:scale-105 border-2 border-slate-100 px-6 py-6 flex flex-col space-y-2 items-start min-h-[190px]"
        >
          <div class="w-full flex justify-between mb-2">
            <h3 class="text-xl font-semibold text-gray-800 truncate">{{ owner.name }}</h3>
            <span class="text-xs text-gray-400">{{ owner.id }}</span>
          </div>
          <div class="text-sm text-gray-700">🏠 <strong>Property:</strong> <span class="truncate">{{ owner.property }}</span></div>
          <div class="text-sm text-gray-700">📍 <strong>Location:</strong> Lat: <span class="font-mono">{{ owner.latitude.toFixed(4) }}</span>,
             Long: <span class="font-mono">{{ owner.longitude.toFixed(4) }}</span></div>
          <div class="flex-1 flex items-end w-full mt-2">
            <button class="ml-auto text-blue-500 hover:underline text-sm">Details</button>
          </div>
        </div>
      </div>
      <div v-else class="text-center p-8 text-gray-500 italic">
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

    <!-- Financials and Charts Section -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-2">Financials & Summary Charts</h2>
      <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out mb-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <canvas id="ownersBarChart"></canvas>
          </div>
          <div>
            <canvas id="propertiesPieChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import Chart from 'chart.js/auto';

const owners = ref([]);
const isLoadingOwners = ref(true);
const errorLoadingOwners = ref(null);
const apiTarget = ref('local');

const summary = ref({
  totalOwners: 0,
  totalProperties: 0,
  avgLatitude: null,
  avgLongitude: null
});

const API_ENDPOINTS = {
  local: 'http://localhost:3000', // or whichever port your backend runs on
  netlify: 'https://your-netlify-backend.netlify.app/.netlify/functions'
};

const fetchOwners = async () => {
  console.log('Dashboard: fetchOwners called');
  isLoadingOwners.value = true;
  errorLoadingOwners.value = null;
  
  try {
    // For now, we'll use simulated data regardless of endpoint
    // In a real implementation, you would use:
    // const endpoint = API_ENDPOINTS[apiTarget.value];
    // const response = await fetch(`${endpoint}/owners`);
    // if (!response.ok) throw new Error('Failed to fetch');
    // owners.value = await response.json();
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    owners.value = [
      { id: 'mapOwner1', name: 'John Doe (from Map)', property: '123 Main St, Anytown', latitude: 34.0522, longitude: -118.2437 },
      { id: 'mapOwner2', name: 'Jane Smith (from Map)', property: '456 Oak Ave, Sometown', latitude: 34.0530, longitude: -118.2440 },
      { id: 'mapOwner3', name: 'Peter Jones (from Map)', property: '789 Pine Ln, Otherville', latitude: 34.0540, longitude: -118.2450 },
    ];
    console.log(`Dashboard: Owners data loaded (simulated ${apiTarget.value} data)`, owners.value);
    computeSummary();
  } catch (error) {
    console.error('Dashboard: Error fetching owners:', error);
    errorLoadingOwners.value = 'Failed to load owner information.';
    owners.value = [];
    computeSummary();
  } finally {
    isLoadingOwners.value = false;
  }
};

function computeSummary() {
  // Total owners
  summary.value.totalOwners = owners.value.length;
  summary.value.totalProperties = owners.value.length; // 1 per owner in sample
  
  if (owners.value.length) {
    summary.value.avgLatitude = (
      owners.value.reduce((ac, o) => ac + (o.latitude || 0), 0) / owners.value.length
    ).toFixed(4);
    summary.value.avgLongitude = (
      owners.value.reduce((ac, o) => ac + (o.longitude || 0), 0) / owners.value.length
    ).toFixed(4);
  } else {
    summary.value.avgLatitude = null;
    summary.value.avgLongitude = null;
  }
}

// Chart rendering/computed data
let ownersBarChart = null;
let propertiesPieChart = null;

function destroyCharts() {
  if (ownersBarChart) {
    ownersBarChart.destroy();
    ownersBarChart = null;
  }
  if (propertiesPieChart) {
    propertiesPieChart.destroy();
    propertiesPieChart = null;
  }
}

function renderCharts() {
  destroyCharts();
  // Owners per property (bar)
  if (owners.value.length) {
    const ctx1 = document.getElementById('ownersBarChart').getContext('2d');
    ownersBarChart = new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: owners.value.map(o => o.name),
        datasets: [{
          label: 'Owners',
          data: owners.value.map(() => 1), // One property per owner for demo
          backgroundColor: ['#3B82F6', '#8B5CF6', '#F59E42']
        }]
      },
      options: {
        plugins: { legend: { display: false } }
      }
    });

    // Owners per (fake) region/type pie
    const ctx2 = document.getElementById('propertiesPieChart').getContext('2d');
    propertiesPieChart = new Chart(ctx2, {
      type: 'pie',
      data: {
        labels: owners.value.map(o => o.name),
        datasets: [{
          data: owners.value.map(() => 1),
          backgroundColor: ['#3B82F6', '#8B5CF6', '#F59E42']
        }]
      }
    });
  }
}

onMounted(() => {
  console.log('Dashboard: Component Mounted. Fetching owners...');
  fetchOwners();
});

onUnmounted(() => {
  console.log('Dashboard: Component Unmounted.');
  destroyCharts();
});

watch(owners, () => {
  computeSummary();
  // Ensure nextTick so DOM is updated
  setTimeout(renderCharts, 80);
});

</script>

<style scoped>
/* Scoped styles for the dashboard */
/* You can add custom styles here if Tailwind isn't enough, but try to use Tailwind first */
</style>
