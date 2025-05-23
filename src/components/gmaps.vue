<template>
  <sidebar />
  <div class="combined_container">
    <div class="searchup_container">
      <div class="search_filter_row">
        <!-- Search input -->
        <div class="search_wrapper">
          <div class="address_search_icon" style="display: none;">
            <i class="pi pi-search" style="font-size: 1.2rem; color:black; margin-right:15px;" @click="geocodeAddress"></i>
            <i class="pi pi-times" style="font-size: 1.2rem; color: black" @click="disablesearch"></i>
          </div>
          <input type="text" v-model="name" id="search_address" class="search_address" 
                 placeholder="Search By Address" @keyup.enter="geocodeAddress"/>
        </div>
        
        <!-- Filter dropdowns -->
        <div class="filter_container">
          <div class="filter_dropdown">
            <select v-model="propertyTypeFilter" class="filter_select">
              <option value="">Property Type</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Mixed Use">Mixed Use</option>
              <option value="Resort">Resort</option>
              <option value="Government">Government</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Educational">Educational</option>
            </select>
          </div>
          
          <div class="filter_dropdown">
            <select v-model="priceRangeFilter" class="filter_select">
              <option value="">Price Range</option>
              <option value="0-250000">$0 - $250,000</option>
              <option value="250000-500000">$250,000 - $500,000</option>
              <option value="500000-1000000">$500,000 - $1,000,000</option>
              <option value="1000000+">$1,000,000+</option>
            </select>
          </div>
          
          <div class="filter_dropdown">
            <select v-model="yearBuiltFilter" class="filter_select">
              <option value="">Year Built</option>
              <option value="2020+">2020+</option>
              <option value="2010-2019">2010-2019</option>
              <option value="2000-2009">2000-2009</option>
              <option value="1990-1999">1990-1999</option>
              <option value="pre-1990">Before 1990</option>
            </select>
          </div>
        </div>
        
        <!-- Save button -->
        <button class="save_search_btn" @click="saveSearch">
          <i class="pi pi-save"></i> Save Search
        </button>
      </div>
      
      <div id="loadingelemnet" style="display:none; color: black;">
        <p>Loading.....</p>
      </div>
      <div id="searchresults">
      </div>
    </div>
  </div>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>

<script setup>
import { onMounted, nextTick, ref, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import sidebar from '../layout/sidebar.vue'
import axios from "axios"
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import PropertyDetails from "../layout/PropertyDetails.vue";

// Existing code...
let map = null
let marker = null
let markerClusterGroup = null
const results = ref([])
const name = ref('')
let autocomplete = null
let addressCard = ref(false)

// New filter refs
const propertyTypeFilter = ref('')
const priceRangeFilter = ref('')
const yearBuiltFilter = ref('')
const savedSearches = ref([])

// Function to save current search criteria
const saveSearch = () => {
  const searchCriteria = {
    address: name.value,
    propertyType: propertyTypeFilter.value,
    priceRange: priceRangeFilter.value,
    yearBuilt: yearBuiltFilter.value,
    timestamp: new Date().toISOString()
  }
  
  // Add to saved searches
  savedSearches.value.push(searchCriteria)
  
  // Save to localStorage for persistence
  try {
    localStorage.setItem('wealthMapSavedSearches', JSON.stringify(savedSearches.value))
    alert('Search saved successfully!')
  } catch (error) {
    console.error('Error saving search:', error)
    alert('Failed to save search')
  }
}

// Load saved searches on component mount
onMounted(() => {
  try {
    const saved = localStorage.getItem('wealthMapSavedSearches')
    if (saved) {
      savedSearches.value = JSON.parse(saved)
    }
  } catch (error) {
    console.error('Error loading saved searches:', error)
  }
  
  // Rest of your existing onMounted code...
})

// Watch for filter changes to apply filtering
watch([propertyTypeFilter, priceRangeFilter, yearBuiltFilter], () => {
  applyFilters()
})

// Function to apply filters to the map
const applyFilters = () => {
  if (!markerClusterGroup) return
  
  // Clear existing markers
  markerClusterGroup.clearLayers()
  
  // Filter properties based on selected criteria
  const filteredProperties = properties.filter(prop => {
    let matchesType = true
    let matchesPrice = true
    let matchesYear = true
    
    // Filter by property type
    if (propertyTypeFilter.value && prop.type !== propertyTypeFilter.value) {
      matchesType = false
    }
    
    // Add logic for price and year filtering when that data is available
    // This would require your property data to include price and year built
    
    return matchesType && matchesPrice && matchesYear
  })
  
  // Add filtered properties to the map
  addPropertiesToMap(filteredProperties)
}

// Function to add properties to the map (modified from your loadPropertiesData)
const addPropertiesToMap = (propertiesToAdd) => {
  propertiesToAdd.forEach(prop => {
    // Your existing marker creation code...
    // This would be the same code you have in loadPropertiesData
    // that creates markers for each property
  })
}

// Your existing functions...

</script>

<style scoped>
/* Existing styles... */

/* New styles for filter row */
.search_filter_row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.search_wrapper {
  position: relative;
  flex: 1;
  min-width: 200px;
}

.filter_container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex: 2;
}

.filter_dropdown {
  flex: 1;
  min-width: 150px;
}

.filter_select {
  width: 100%;
  padding: 10px;
  border-radius: 16px;
  border: none;
  background-color: white;
  color: black;
  font-size: 14px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.save_search_btn {
  padding: 10px 16px;
  border-radius: 16px;
  border: none;
  background-color: #1A73E8;
  color: white;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background-color 0.2s;
}

.save_search_btn:hover {
  background-color: #1557b0;
}

.save_search_btn i {
  color: white;
}

/* Adjust existing styles */
.search_address {
  width: 100%;
  padding: 10px;
  border-radius: 16px;
  border: 0;
  margin: 0;
  background-color: white;
  color: black;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .search_filter_row {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter_container {
    flex-direction: column;
  }
  
  .save_search_btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
