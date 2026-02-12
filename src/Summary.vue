```vue
<template>
  <div class="summary">
    <!-- Header Navigation -->
    <header class="header" :class="{ 'header-hidden': !isHeaderVisible }">
      <div class="logo">🚗 Summary Record</div>
      <nav class="nav">
        <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
        <router-link to="/summary" class="nav-link">Summary</router-link>
        <button @click="logout" class="nav-link logout">Logout</button>
      </nav>
    </header>

    <!-- Main Content -->
    <main>
      <h1>Vehicle Summary Report</h1>
      <p class="subtitle">A detailed overview of vehicle records and statistics.</p>

      <div class="table-container">
        <table class="summary-table">
          <thead>
            <tr>
              <th>Vehicle Image</th>
              <th>Vehicle Type</th>
              <th>Record Count</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(vehicle, type) in vehicles" :key="type">
              <td>
                <img :src="vehicle.image" :alt="type" class="vehicle-img" />
              </td>
              <td>{{ type }}</td>
              <td>{{ vehicle.count }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="total-label"><strong>Total Vehicles Recorded</strong></td>
              <td class="total-value"><strong>{{ totalVehicles }}</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import { reactive, computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

// Import images (ensure @ alias points to src/, and files exist in src/assets/) - same as dashboard for consistency
import truckImg from '@/assets/truck.jpg';
import padyakImg from '@/assets/padyak.jpg';
import tricycleImg from '@/assets/tricycle.jpg';
import motorcycleImg from '@/assets/motorcycle.jpg';
import etrikeImg from '@/assets/Etrike.jpg';
import carImg from '@/assets/car.jpg';

// Placeholder fallback for broken images (a small transparent data URL) - same as dashboard
const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iODAiIGZpbGw9IiNjY2MiLz48dGV4dCB4PSI2MCIgeT0iNDAiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';

const router = useRouter()

const isHeaderVisible = ref(true)
let lastScrollY = 0

const handleScroll = () => {
  const currentScrollY = window.scrollY
  isHeaderVisible.value = currentScrollY < lastScrollY
  lastScrollY = currentScrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Load saved vehicles from localStorage - same as dashboard for consistency
const savedVehicles = JSON.parse(localStorage.getItem('vehicles') || '{}')

const vehicles = reactive({
  Trucks: {
    count: savedVehicles.Trucks?.count || 0,
    image: savedVehicles.Trucks?.image || (truckImg || placeholderImage),
    info: savedVehicles.Trucks?.info || 'Item/Goods-Transportation Type Vehicle.'
  },
  Padyak: {
    count: savedVehicles.Padyak?.count || 0,
    image: savedVehicles.Padyak?.image || (padyakImg || placeholderImage),
    info: savedVehicles.Padyak?.info || 'Pedicab Three-wheeled type for short distance transportation.'
  },
  Tricycle: {
    count: savedVehicles.Tricycle?.count || 0,
    image: savedVehicles.Tricycle?.image || (tricycleImg || placeholderImage),
    info: savedVehicles.Tricycle?.info || 'Motorized Three-Wheeled vehicle type transport.'
  },
  Motorcycle: {
    count: savedVehicles.Motorcycle?.count || 0,
    image: savedVehicles.Motorcycle?.image || (motorcycleImg || placeholderImage),
    info: savedVehicles.Motorcycle?.info || 'Two-wheeled motor vehicle for fast transport.'
  },
  Car: {
    count: savedVehicles.Car?.count || 0,
    image: savedVehicles.Car?.image ||(carImg || placeholderImage),
    info: savedVehicles.Car?.info || 'Four-wheeled passenger vehicle.'
  },
  Etrike: {
    count: savedVehicles.Etrike?.count || 0,
    image: savedVehicles.Etrike?.image || (etrikeImg || placeholderImage),
    info: savedVehicles.Etrike?.info || 'Electric three-wheeled vehicle for transportation.'
  }
})

// Compute total - same as before
const totalVehicles = computed(() => {
  return Object.values(vehicles).reduce((sum, v) => sum + v.count, 0)
})

// Logout function - same as before
const logout = () => {
  localStorage.removeItem('currentUser')
  router.push('/')
}
</script>

<style scoped>
.summary {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  background-color: #f8f9fa;
  min-height: 100vh;
}

/* Full-width Header - updated for consistency with dashboard */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: linear-gradient(to bottom, rgb(85, 16, 222), rgb(184, 168, 248));
  padding: 1rem 2rem;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 13%;
  box-sizing: border-box;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.header-hidden {
  transform: translateY(-100%);
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: text-decoration 0.3s;
}

.nav-link:hover {
  text-decoration: underline;
}

.logout {
  background: #211a89;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.3s;
}

.logout:hover {
  background: #1a146a;
}

/* Push content below fixed header */
main {
  margin-top: 6rem;
  text-align: center;
  padding: 2rem 0;
}

h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
}

/* Table Container for better responsiveness */
.table-container {
  overflow-x: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

/* Table Styles - Enhanced for formality and cleanliness */
.summary-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
  background: white;
}

.summary-table th,
.summary-table td {
  border: 1px solid #e0e0e0;
  padding: 1rem;
  text-align: center;
  vertical-align: middle;
  transition: background-color 0.3s;
}

.summary-table th {
  background-color: #f1f3f4;
  font-weight: 600;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.summary-table tbody tr:hover {
  background-color: #f9f9f9;
}

.summary-table tfoot td {
  font-weight: bold;
  background-color: #e8f4fd;
  color: #007bff;
}

.total-label {
  text-align: right;
  padding-right: 2rem;
}

.total-value {
  font-size: 1.2rem;
  color: #007bff;
}

.vehicle-img {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #ddd;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .summary {
    padding: 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  .summary-table th,
  .summary-table td {
    padding: 0.5rem;
    font-size: 0.9rem;
  }

  .vehicle-img {
    width: 80px;
    height: 60px;
  }
}
</style>
```