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
      <div v-if="owners.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-6 group">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12a1 1 0 01-1-1v-3a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1 1v1a1 1 0 01-1 1H9z" />
                    <path fill-rule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 000-2H4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-600 mb-1">Total Owners</p>
                  <p class="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{{ summary.totalOwners }}</p>
                </div>
              </div>
            </div>
            <div class="text-green-500">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-6 group">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-600 mb-1">Total Properties</p>
                  <p class="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">{{ summary.totalProperties }}</p>
                </div>
              </div>
            </div>
            <div class="text-green-500">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-6 group">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-600 mb-1">Avg. Latitude</p>
                  <p class="text-xl font-mono text-gray-900 group-hover:text-purple-600 transition-colors">{{ summary.avgLatitude || "--" }}</p>
                </div>
              </div>
            </div>
            <div class="text-purple-500">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-6 group">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-600 mb-1">Avg. Longitude</p>
                  <p class="text-xl font-mono text-gray-900 group-hover:text-orange-600 transition-colors">{{ summary.avgLongitude || "--" }}</p>
                </div>
              </div>
            </div>
            <div class="text-orange-500">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="isLoadingOwners" class="text-center p-6">
        <span class="text-blue-500">Loading owners...</span>
      </div>
      <div v-else-if="errorLoadingOwners" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
        <strong class="font-bold">Error: </strong> <span>{{ errorLoadingOwners }}</span>
      </div>
      <div v-else-if="owners.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-6">
        <div
          v-for="owner in owners"
          :key="owner.id"
          class="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer transform hover:-translate-y-1"
        >
          <!-- Card Header with Gradient Background -->
          <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 pb-4">
            <div class="flex items-center space-x-4">
              <div class="relative">
                <div class="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {{ owner.name.charAt(0).toUpperCase() }}
                </div>
                <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                  {{ owner.name.replace(' (from Map)', '') }}
                </h3>
                <p class="text-sm text-gray-600 font-medium">Property Owner</p>
                <div class="flex items-center mt-1">
                  <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span class="text-xs text-gray-500">Online</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Card Body -->
          <div class="p-6 pt-4 space-y-4">
            <!-- Property Address -->
            <div class="flex items-start space-x-3">
              <div class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-gray-700 mb-1">Property Address</p>
                <p class="text-sm text-gray-600 break-words">{{ owner.property }}</p>
              </div>
            </div>

            <!-- Coordinates -->
            <div class="flex items-start space-x-3">
              <div class="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"></path>
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-gray-700 mb-1">Coordinates</p>
                <p class="text-xs text-gray-600 font-mono bg-gray-50 px-2 py-1 rounded-md inline-block">
                  {{ owner.latitude.toFixed(4) }}, {{ owner.longitude.toFixed(4) }}
                </p>
              </div>
            </div>

            <!-- Property Stats -->
            <div class="bg-gray-50 rounded-xl p-4 space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">Property Value</span>
                <span class="text-sm font-bold text-green-600">$1.2M</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">Map Status</span>
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <span class="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></span>
                  Active
                </span>
              </div>
            </div>
          </div>

          <!-- Card Footer -->
          <div class="px-6 pb-6">
            <button class="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center space-x-2">
              <span>View Details</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </button>
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
