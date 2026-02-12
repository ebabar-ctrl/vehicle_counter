<template>
  <div class="auth-container">
    <!-- Left Panel: Page Name -->
    <div class="left-panel">
      <h1>Camaligan Vehicle Counter</h1>
      <p>Manage your vehicles efficiently and track records with ease.</p>
    </div>

    <!-- Right Panel: Auth Form -->
    <div class="auth-form">
      <h2>{{ isLogin ? 'Login' : 'Register Account' }}</h2>
      <form @submit.prevent="handleSubmit">
        <Transition name="fade">
          <div v-if="!isLogin" class="form-group">
            <label>Name</label>
            <input v-model="form.name" type="text" required />
          </div>
        </Transition>
        <div class="form-group">
          <label>Email</label>
          <input v-model="form.email" type="email" required />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input v-model="form.password" type="password" required />
        </div>
        <Transition name="fade">
          <div v-if="!isLogin" class="form-group">
            <label>Confirm Password</label>
            <input v-model="form.confirmPassword" type="password" required />
          </div>
        </Transition>
        <button :disabled="loading">{{ loading ? 'Processing...' : (isLogin ? 'Login' : 'Register') }}</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
      <p class="toggle">
        {{ isLogin ? "Don't have an account?" : 'Already have an account?' }}
        <a @click="toggleMode">{{ isLogin ? 'Register' : 'Login' }}</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = reactive({ name: '', email: '', password: '', confirmPassword: '' })
const isLogin = ref(true)
const loading = ref(false)
const error = ref('')

const toggleMode = () => {
  isLogin.value = !isLogin.value
  error.value = ''
  Object.assign(form, { name: '', email: '', password: '', confirmPassword: '' })
}

const handleSubmit = () => {
  loading.value = true
  error.value = ''
  if (!isLogin.value && form.password !== form.confirmPassword) {
    error.value = 'Passwords do not match.'
    loading.value = false
    return
  }
  const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
  if (isLogin.value) {
    const user = users.find(u => u.email === form.email && u.password === form.password)
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user))
      router.push('/dashboard')
    } else {
      error.value = 'Invalid credentials.'
    }
  } else {
    if (users.some(u => u.email === form.email)) {
      error.value = 'Email already exists.'
    } else {
      users.push({ name: form.name, email: form.email, password: form.password })
      localStorage.setItem('registeredUsers', JSON.stringify(users))
      alert('Registered! Please login.')
      toggleMode()
    }
  }
  loading.value = false
}
</script>

<style scoped>
.auth-container {
  display: flex;
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, #4facfe, #00f2fe); /* Changed to a blue-cyan gradient */
}

/* Left Panel: Page Name */
.left-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #9f84e8, #161044); /* Purple-blue gradient for contrast */
  color: white;
  padding: 2rem;
  text-align: center;
}

.left-panel h1 {
  font-size: 3.4rem;
  margin-bottom: 1rem;
}

.left-panel p {
  font-size: 1.2rem;
  opacity: 0.9;
}

/* Right Panel: Auth Form */
.auth-form {
  flex: 1;
  background-image: linear-gradient(to right, rgb(254, 253, 255) , rgb(226, 219, 252));
  padding: 2rem;
  border-radius: 0; /* Removed border-radius for full panel */
  box-shadow: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 400px; /* Limit width for better UX */
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #0c0066;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #5c4d8792;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.75rem;
  background: #a35dff; 
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

button:disabled {
  background: #ccc;
}

.error {
  color: red;
  margin-top: 1rem;
}

.toggle {
  text-align: center;
  margin-top: 1rem;
}

.toggle a {
  color: #007bff; /* Changed to blue */
  text-decoration: none;
  cursor: pointer;
}

.toggle a:hover {
  text-decoration: underline;
}

/* Transition Styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>