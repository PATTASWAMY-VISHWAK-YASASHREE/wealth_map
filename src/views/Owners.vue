<template>
  <div class="owners-container p-4">
    <div class="header-section mb-6">
      <h1 class="text-2xl font-bold mb-2">Property Owners</h1>
      <div class="stats-bar flex flex-wrap gap-4 mb-4">
        <div class="stat-card bg-white p-4 rounded-lg shadow flex-1 min-w-[200px]">
          <h3 class="text-gray-600 text-sm">Total Owners</h3>
          <p class="text-2xl font-bold">{{ uniqueOwners.length }}</p>
        </div>
        <div class="stat-card bg-white p-4 rounded-lg shadow flex-1 min-w-[200px]">
          <h3 class="text-gray-600 text-sm">Total Properties</h3>
          <p class="text-2xl font-bold">{{ properties.length }}</p>
        </div>
        <div class="stat-card bg-white p-4 rounded-lg shadow flex-1 min-w-[200px]">
          <h3 class="text-gray-600 text-sm">Total Value</h3>
          <p class="text-2xl font-bold">${{ totalValue.toLocaleString() }}</p>
        </div>
      </div>
    </div>

    <!-- Search and Filter Section -->
    <div class="search-filter-section mb-6">
      <div class="flex flex-wrap gap-4 items-center">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search owners..." 
          class="p-2 border rounded-lg flex-1 min-w-[200px]"
        >
        <select 
          v-model="filterType" 
          class="p-2 border rounded-lg min-w-[150px]"
        >
          <option value="">All Property Types</option>
          <option value="Commercial">Commercial</option>
          <option value="Residential">Residential</option>
          <option value="Mixed Use">Mixed Use</option>
        </select>
        <select 
          v-model="sortBy" 
          class="p-2 border rounded-lg min-w-[150px]"
        >
          <option value="name">Sort by Name</option>
          <option value="properties">Sort by Properties</option>
          <option value="value">Sort by Value</option>
        </select>
      </div>
    </div>

    <!-- Owners Grid -->
    <div class="owners-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="owner in filteredAndSortedOwners" 
        :key="owner.id" 
        class="owner-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <div class="p-4">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="font-bold text-lg mb-1">{{ owner.name }}</h3>
              <p class="text-gray-600 text-sm">{{ owner.properties.length }} Properties</p>
            </div>
            <div class="text-right">
              <p class="font-bold text-lg">${{ owner.totalValue.toLocaleString() }}</p>
              <p class="text-gray-600 text-sm">Total Value</p>
            </div>
          </div>

          <div class="property-types mb-4">
            <h4 class="text-sm font-semibold mb-2">Property Types:</h4>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="type in owner.propertyTypes" 
                :key="type"
                class="px-2 py-1 text-xs rounded-full"
                :class="getTypeClass(type)"
              >
                {{ type }}
              </span>
            </div>
          </div>

          <div class="locations mb-4">
            <h4 class="text-sm font-semibold mb-2">Locations:</h4>
            <div class="text-sm text-gray-600">
              <p v-for="location in owner.locations.slice(0, 2)" :key="location" class="mb-1">
                {{ location }}
              </p>
              <p v-if="owner.locations.length > 2" class="text-blue-600 cursor-pointer">
                +{{ owner.locations.length - 2 }} more locations
              </p>
            </div>
          </div>

          <button 
            @click="viewOwnerDetails(owner)"
            class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            View Details
          </button>
        </div>
      </div>
    </div>

    <!-- Owner Details Modal -->
    <div v-if="selectedOwner" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-start mb-6">
            <h2 class="text-2xl font-bold">{{ selectedOwner.name }}</h2>
            <button @click="selectedOwner = null" class="text-gray-500 hover:text-gray-700">
              <span class="text-2xl">&times;</span>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="stat-card bg-gray-50 p-4 rounded-lg">
              <h3 class="text-gray-600 text-sm">Total Properties</h3>
              <p class="text-2xl font-bold">{{ selectedOwner.properties.length }}</p>
            </div>
            <div class="stat-card bg-gray-50 p-4 rounded-lg">
              <h3 class="text-gray-600 text-sm">Total Value</h3>
              <p class="text-2xl font-bold">${{ selectedOwner.totalValue.toLocaleString() }}</p>
            </div>
          </div>

          <div class="mb-6">
            <h3 class="font-bold mb-3">Properties</h3>
            <div class="space-y-4">
              <div 
                v-for="property in selectedOwner.properties" 
                :key="property.id"
                class="bg-gray-50 p-4 rounded-lg"
              >
                <div class="flex justify-between items-start">
                  <div>
                    <h4 class="font-semibold">{{ property.address }}</h4>
                    <p class="text-sm text-gray-600">{{ property.type }}</p>
                  </div>
                  <p class="font-semibold">${{ property.value.toLocaleString() }}</p>
                </div>
              </div>
            </div>
          </div>

          <button 
            @click="selectedOwner = null"
            class="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Sample data structure (replace with actual data from your map)
const properties = ref([
  {
    id: 1,
    owner: 'John Doe',
    address: '123 Main St, City A',
    type: 'Commercial',
    value: 1500000,
  },
  {
    id: 2,
    owner: 'John Doe',
    address: '456 Oak Ave, City B',
    type: 'Residential',
    value: 800000,
  },
  {
    id: 3,
    owner: 'Jane Smith',
    address: '789 Pine St, City A',
    type: 'Mixed Use',
    value: 2000000,
  },
  // Add more properties as needed
])

// Reactive state
const searchQuery = ref('')
const filterType = ref('')
const sortBy = ref('name')
const selectedOwner = ref(null)

// Computed properties
const uniqueOwners = computed(() => {
  const ownersMap = new Map()
  
  properties.value.forEach(property => {
    if (!ownersMap.has(property.owner)) {
      ownersMap.set(property.owner, {
        id: property.owner,
        name: property.owner,
        properties: [],
        propertyTypes: new Set(),
        locations: new Set(),
        totalValue: 0
      })
    }
    
    const ownerData = ownersMap.get(property.owner)
    ownerData.properties.push(property)
    ownerData.propertyTypes.add(property.type)
    ownerData.locations.add(property.address.split(',')[1].trim())
    ownerData.totalValue += property.value
  })
  
  return Array.from(ownersMap.values()).map(owner => ({
    ...owner,
    propertyTypes: Array.from(owner.propertyTypes),
    locations: Array.from(owner.locations)
  }))
})

const totalValue = computed(() => {
  return properties.value.reduce((sum, property) => sum + property.value, 0)
})

const filteredAndSortedOwners = computed(() => {
  let result = [...uniqueOwners.value]
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(owner => 
      owner.name.toLowerCase().includes(query) ||
      owner.properties.some(p => p.address.toLowerCase().includes(query))
    )
  }
  
  // Apply property type filter
  if (filterType.value) {
    result = result.filter(owner =>
      owner.propertyTypes.includes(filterType.value)
    )
  }
  
  // Apply sorting
  result.sort((a, b) => {
    switch (sortBy.value) {
      case 'properties':
        return b.properties.length - a.properties.length
      case 'value':
        return b.totalValue - a.totalValue
      default:
        return a.name.localeCompare(b.name)
    }
  })
  
  return result
})

// Methods
const viewOwnerDetails = (owner) => {
  selectedOwner.value = owner
}

const getTypeClass = (type) => {
  switch (type) {
    case 'Commercial':
      return 'bg-blue-100 text-blue-800'
    case 'Residential':
      return 'bg-green-100 text-green-800'
    case 'Mixed Use':
      return 'bg-purple-100 text-purple-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>

<style scoped>
.owners-container {
  max-width: 1400px;
  margin: 0 auto;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .stats-bar {
    grid-template-columns: 1fr;
  }
  
  .search-filter-section > div {
    flex-direction: column;
  }
  
  .search-filter-section input,
  .search-filter-section select {
    width: 100%;
  }
}

/* Scrollbar styling */
.owners-grid::-webkit-scrollbar {
  width: 8px;
}

.owners-grid::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.owners-grid::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.owners-grid::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>