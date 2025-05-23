<template>
  <div class="property-details">
    <div v-if="property">
      <div class="property-header">
        <img :src="propertyImage" :alt="propertyType" class="property-image" />
        <div>
          <h3 class="property-address">{{ address }}</h3>
          <p class="property-class">{{ propertyClass }}</p>
          <p class="property-year">Year Built: {{ yearBuilt }}</p>
        </div>
      </div>
      <hr class="property-divider" />
      <div class="property-info">
        <div>
          <p><strong>Lot Size:</strong> {{ lotSize }} acres</p>
          <p><strong>Bedrooms:</strong> {{ bedrooms }}</p>
          <p><strong>Bathrooms:</strong> {{ bathrooms }}</p>
        </div>
        <div>
          <p><strong>Assessed Value:</strong> ${{ assessedValue.toLocaleString() }}</p>
          <p><strong>Market Value:</strong> ${{ marketValue.toLocaleString() }}</p>
          <p><strong>Tax Amount ({{ taxYear }}):</strong> ${{ taxAmount.toLocaleString() }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No property data available.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PropertyDetails",
  props: {
    property: {
      type: Object,
      required: true,
    },
  },
  computed: {
    address() {
      return this.property.address?.oneLine || "N/A";
    },
    lotSize() {
      return this.property.lot?.lotSize1 || "N/A";
    },
    propertyClass() {
      return this.property.summary?.propclass || "N/A";
    },
    propertyType() {
      return this.property.summary?.propertyType || "N/A";
    },
    yearBuilt() {
      return this.property.summary?.yearbuilt || "N/A";
    },
    bedrooms() {
      return this.property.building?.rooms?.beds || "N/A";
    },
    bathrooms() {
      return this.property.building?.rooms?.bathstotal || "N/A";
    },
    assessedValue() {
      return this.property.assessment?.assessed?.assdttlvalue || 0;
    },
    marketValue() {
      return this.property.assessment?.market?.mktttlvalue || 0;
    },
    taxAmount() {
      return this.property.assessment?.tax?.taxamt || 0;
    },
    taxYear() {
      return this.property.assessment?.tax?.taxyear || "N/A";
    },
    propertyImage() {
      const propertyImages = {
        "SINGLE FAMILY RESIDENCE": "path/to/residential.jpg",
        COMMERCIAL: "path/to/commercial.jpg",
        "MIXED USE": "path/to/mixed-use.jpg",
        RESORT: "path/to/resort.jpg",
        "LUXURY RESIDENTIAL": "path/to/luxury.jpg",
        DEFAULT: "path/to/default.jpg",
      };
      return propertyImages[this.propertyType] || propertyImages["DEFAULT"];
    },
  },
};
</script>

<style scoped>
.property-details {
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.property-header {
  display: flex;
  align-items: center;
  gap: 15px;
}

.property-image {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
}

.property-address {
  margin: 0;
  color: #2196f3;
}

.property-class,
.property-year {
  margin: 5px 0;
  color: #666;
}

.property-divider {
  margin: 15px 0;
  border: none;
  border-top: 1px solid #ddd;
}

.property-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.property-info p {
  margin: 4px 0;
  line-height: 1.5;
  color: #333;
}
</style>