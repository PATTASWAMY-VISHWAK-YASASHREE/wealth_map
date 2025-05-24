<template>
  <div class="owners-container p-6 bg-gray-50 min-h-screen">
    <div class="header-section mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">Property Owners</h1>
      
      <!-- Stats Cards -->
      <div class="stats-bar grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="stat-card bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" />
                <path fill-rule="evenodd" d="M4.828 2.172a4 4 0 015.656 0L12 3.686l1.516-1.514a4 4 0 115.656 5.656L12 14.5l-7.172-7.172a4 4 0 010-5.656z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-gray-600 text-sm font-medium">Total Owners</h3>
              <p class="text-3xl font-bold text-gray-900">{{ uniqueOwners.length }}</p>
            </div>
          </div>
        </div>
        
        <div class="stat-card bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-gray-600 text-sm font-medium">Total Properties</h3>
              <p class="text-3xl font-bold text-gray-900">{{ properties.length }}</p>
            </div>
          </div>
        </div>
        
        <div class="stat-card bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-gray-600 text-sm font-medium">Total Value</h3>
              <p class="text-3xl font-bold text-gray-900">${{ totalValue.toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search and Filter Section -->
    <div class="search-filter-section mb-8">
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div class="flex flex-wrap gap-4 items-center">
          <!-- Search Input -->
          <div class="flex-1 min-w-[300px]">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Search owners, properties, or locations..." 
                class="pl-11 pr-4 py-3 w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white font-medium"
              >
              <div v-if="searchQuery" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button @click="searchQuery = ''" class="text-gray-400 hover:text-gray-600 transition-colors">
                  <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Filter by Property Type -->
          <div class="relative">
            <select 
              v-model="filterType" 
              class="appearance-none px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[180px] transition-all bg-gray-50 focus:bg-white font-medium cursor-pointer"
            >
              <option value="">All Property Types</option>
              <option value="Commercial">Commercial</option>
              <option value="Residential">Residential</option>
              <option value="Mixed Use">Mixed Use</option>
            </select>
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg class="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>

          <!-- Sort Options -->
          <div class="relative">
            <select 
              v-model="sortBy" 
              class="appearance-none px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[180px] transition-all bg-gray-50 focus:bg-white font-medium cursor-pointer"
            >
              <option value="name">Sort by Name</option>
              <option value="properties">Sort by Properties</option>
              <option value="value">Sort by Value</option>
            </select>
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg class="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>

          <!-- Results Count -->
          <div class="flex items-center space-x-2 text-sm text-gray-600 font-medium">
            <svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
            </svg>
            <span>{{ filteredAndSortedOwners.length }} owners found</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Owners Grid -->
    <div class="owners-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div 
        v-for="owner in filteredAndSortedOwners" 
        :key="owner.id" 
        class="owner-card bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer transform hover:-translate-y-1"
      >
        <!-- Card Header with Gradient -->
        <div class="bg-gradient-to-br from-gray-50 to-blue-50 p-6 border-b border-gray-100">
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center space-x-4">
              <div class="relative">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {{ owner.name.charAt(0).toUpperCase() }}
                </div>
                <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white shadow-md"></div>
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-xl mb-1 text-gray-900 group-hover:text-blue-600 transition-colors">{{ owner.name }}</h3>
                <p class="text-gray-600 text-sm font-medium">{{ owner.properties.length }} Properties</p>
                <div class="flex items-center mt-2">
                  <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span class="text-xs text-gray-500 font-medium">Active Owner</span>
                </div>
              </div>
            </div>
            <div class="text-right">
              <div class="bg-white rounded-xl px-3 py-2 shadow-sm border border-gray-200">
                <p class="font-bold text-lg text-gray-900">${{ owner.totalValue.toLocaleString() }}</p>
                <p class="text-gray-500 text-xs font-medium">Total Value</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Card Body -->
        <div class="p-6 space-y-5">
          <!-- Property Types -->
          <div class="property-types">
            <h4 class="text-sm font-semibold mb-3 text-gray-700 flex items-center">
              <svg class="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Property Types
            </h4>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="type in owner.propertyTypes" 
                :key="type"
                class="px-3 py-1.5 text-xs font-semibold rounded-full border transition-all hover:scale-105"
                :class="getTypeClass(type)"
              >
                {{ type }}
              </span>
            </div>
          </div>

          <!-- Locations -->
          <div class="locations">
            <h4 class="text-sm font-semibold mb-3 text-gray-700 flex items-center">
              <svg class="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              Primary Locations
            </h4>
            <div class="space-y-2">
              <div v-for="location in owner.locations.slice(0, 2)" :key="location" 
                   class="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                <div class="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                {{ location }}
              </div>
              <div v-if="owner.locations.length > 2" 
                   class="text-sm text-blue-600 hover:text-blue-800 cursor-pointer font-medium bg-blue-50 rounded-lg px-3 py-2 transition-colors">
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                  </svg>
                  +{{ owner.locations.length - 2 }} more locations
                </span>
              </div>
            </div>
          </div>

          <!-- Property Statistics -->
          <div class="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-100">
            <div class="grid grid-cols-2 gap-4">
              <div class="text-center">
                <p class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Properties</p>
                <p class="text-lg font-bold text-gray-900">{{ owner.properties.length }}</p>
              </div>
              <div class="text-center">
                <p class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Avg. Value</p>
                <p class="text-lg font-bold text-green-600">${{ Math.round(owner.totalValue / owner.properties.length / 1000) }}K</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Card Footer -->
        <div class="p-6 pt-0">
          <button 
            @click="viewOwnerDetails(owner)"
            class="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <span>View Full Details</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Owner Details Modal -->
    <div v-if="selectedOwner" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b border-gray-200">
          <div class="flex justify-between items-start">
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {{ selectedOwner.name.charAt(0).toUpperCase() }}
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-900">{{ selectedOwner.name }}</h2>
                <p class="text-gray-600 font-medium">Property Portfolio Overview</p>
                <div class="flex items-center mt-1">
                  <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span class="text-sm text-gray-500">Active Owner</span>
                </div>
              </div>
            </div>
            <button @click="selectedOwner = null" class="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Modal Body -->
        <div class="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <!-- Stats Section -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-gray-600 text-sm font-medium">Total Properties</h3>
                  <p class="text-3xl font-bold text-blue-600">{{ selectedOwner.properties.length }}</p>
                </div>
              </div>
            </div>
            
            <div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-gray-600 text-sm font-medium">Total Value</h3>
                  <p class="text-3xl font-bold text-green-600">${{ selectedOwner.totalValue.toLocaleString() }}</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-gray-600 text-sm font-medium">Avg. Value</h3>
                  <p class="text-3xl font-bold text-purple-600">${{ Math.round(selectedOwner.totalValue / selectedOwner.properties.length / 1000) }}K</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Properties List -->
          <div class="mb-6">
            <h3 class="font-bold mb-4 text-xl text-gray-900 flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Property Portfolio
            </h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div 
                v-for="property in selectedOwner.properties" 
                :key="property.id"
                class="bg-gradient-to-br from-gray-50 to-blue-50 p-5 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 group"
              >
                <div class="flex justify-between items-start mb-3">
                  <div class="flex-1">
                    <h4 class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{{ property.address }}</h4>
                    <div class="flex items-center mt-1">
                      <span class="text-xs font-medium px-2 py-1 rounded-full" :class="getTypeClass(property.type)">
                        {{ property.type }}
                      </span>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-bold text-lg text-green-600">${{ property.value.toLocaleString() }}</p>
                    <p class="text-xs text-gray-500">Market Value</p>
                  </div>
                </div>
                <div class="flex items-center text-sm text-gray-600 mt-3 pt-3 border-t border-gray-200">
                  <svg class="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                  Property ID: {{ property.id }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="p-6 border-t border-gray-200 bg-gray-50">
          <button 
            @click="selectedOwner = null"
            class="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Close Details
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
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'Residential':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'Mixed Use':
      return 'bg-purple-100 text-purple-800 border-purple-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
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