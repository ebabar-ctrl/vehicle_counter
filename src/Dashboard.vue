<template>
  <!-- Your template remains unchanged -->
  <div class="dashboard">
    <!-- Header Navigation -->
    <header class="header" :class="{ 'header-hidden': !isHeaderVisible }">
      <div class="logo">🚗 Vehicle Dashboard</div>
      <h3>Welcome, {{ currentUser.name }}!</h3>
      <nav class="nav">
        <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
        <router-link to="/summary" class="nav-link">Summary</router-link>
        <button @click="logout" class="nav-link logout">Logout</button>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="main-layout">
      <!-- Dashboard Information -->
      <section class="info-panel">
        <div class="background-box">
          <h1>Dashboard Information</h1>
          <p>
           This dashboard records and monitors the types of vehicles passing by the
      Camaligan Area. It helps track traffic flow, identify common modes of
      transport, and provide useful data for local planning and community
      awareness. Each counter below represents a category of vehicle, showing
      how many have been observed over time.
          </p>
        </div>
      </section>

      <!-- Vehicle Counters in Two Columns -->
      <section class="counters">
        <h2>Vehicle Counters</h2>
        <div class="counters-grid">
          <div v-for="(vehicle, type) in vehicles" :key="type" class="counter">
            <img :src="vehicle.image" :alt="type" class="vehicle-img" />
            <h3>{{ type }}</h3>
            <p class="info">{{ vehicle.info }}</p>
            <p class="count">Records: {{ vehicle.count }}</p>
            <button @click="increase(type)">+</button>
            <button @click="decrease(type)" :disabled="vehicle.count === 0">-</button>
          </div>
        </div>
        <button @click="resetCounts" class="reset-button">Reset All Counts</button>
      </section>
    </main>
  </div>
</template>

<script setup>
import { reactive, computed, watch, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

// Import images (ensure @ alias points to src/, and files exist in src/assets/)
import truckImg from '@/assets/truck.jpg';
import padyakImg from '@/assets/padyak.jpg';
import tricycleImg from '@/assets/tricycle.jpg';
import motorcycleImg from '@/assets/motorcycle.jpg';
import carImg from '@/assets/car.jpg';
import etrikeImg from '@/assets/Etrike.jpg';

// Debug: Log imports to check if they resolve (remove in production)
console.log('Truck image import:', truckImg);
console.log('Padyak image import:', padyakImg);
console.log('Tricycle image import:', tricycleImg);
console.log('Motorcycle image import:', motorcycleImg);
console.log('Car image import:', carImg);
console.log('E-trike image import:', etrikeImg);

// Placeholder fallback for broken images (a small transparent data URL)
const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iODAiIGZpbGw9IiNjY2MiLz48dGV4dCB4PSI2MCIgeT0iNDAiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';

const router = useRouter()
const currentUser = computed(() => JSON.parse(localStorage.getItem('currentUser') || '{}'))

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

// Load saved vehicle data from localStorage or initialize defaults
const savedVehicles = JSON.parse(localStorage.getItem('vehicles') || '{}')

const vehicles = reactive({
  Trucks: {
    count: savedVehicles.Trucks?.count || 0,
    image: savedVehicles.Trucks?.image || (truckImg || placeholderImage),  // Use import or fallback
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
    image: savedVehicles.Car?.image || (carImg || placeholderImage),
    info: savedVehicles.Car?.info || 'Four-wheeled passenger vehicle.'
  },
  Etrike: {
    count: savedVehicles.Etrike?.count || 0,
    image: savedVehicles.Etrike?.image || (etrikeImg || placeholderImage),
    info: savedVehicles.Etrike?.info || 'Electric three-wheeled vehicle for transportation.'
  }
})

// Save changes to localStorage
watch(vehicles, (newVehicles) => {
  localStorage.setItem('vehicles', JSON.stringify(newVehicles))
}, { deep: true })

const increase = (type) => {
  vehicles[type].count++
}

const decrease = (type) => {
  if (vehicles[type].count > 0) {
    vehicles[type].count--
  }
}

const logout = () => {
  localStorage.removeItem('currentUser')
  router.push('/')
}

const resetCounts = () => {
  for (const type in vehicles) {
    vehicles[type].count = 0
  }
}
</script>

<style scoped>

.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Full-width Header */
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
  box-sizing: border-box;
  z-index: 1000;
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
}

.nav-link:hover {
  text-decoration: underline;
}

.logout {
  background: #211a89;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

/* Layout: Vertical Stack */
.main-layout {
  display: flex;
  flex-direction: column;
  margin-top: 6rem;
  gap: 2rem;
}

/* Dashboard Information */
.info-panel {
  display: flex;
  justify-content: center;
}

.background-box {
  background: rgba(240, 240, 255, 0.9);
  padding: 2rem;
  border-radius: 8px;
  text-align: left;
  max-width: 800px;
  width: 100%;
}

/* Vehicle Counters in Two Columns */
.counters {
  width: 100%;
}

.counters-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.counter {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
}

.vehicle-img {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

.info {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.5rem;
}

.count {
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

.counter button {
  margin: 0.25rem;
  padding: 0.5rem 1rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.counter button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.reset-button {
  margin-top: 3rem;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  background: #9d89ff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-start;
}

.reset-button:hover {
  background: #c82333;
}
</style>