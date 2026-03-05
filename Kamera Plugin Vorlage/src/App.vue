<script setup>
import { ref } from 'vue'
import CameraExercise from './Views/CameraExercise.vue'
import CameraSolution from './Views/CameraSolution.vue'

const currentView = ref('exercise')
</script>

<template>
  <div class="app-layout">
    <nav class="navigation">
      <button @click="currentView = 'exercise'" :class="{ active: currentView === 'exercise' }">Übung</button>
      <button @click="currentView = 'solution'" :class="{ active: currentView === 'solution' }">Lösung</button>
    </nav>

    <main class="content">
      <CameraExercise v-if="currentView === 'exercise'" />
      <CameraSolution v-if="currentView === 'solution'" />
    </main>
  </div>
</template>

<style scoped>
.navigation {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 20px;
  background-color: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
}

.navigation button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  transition: all 0.2s;
}

.navigation button:hover {
  background-color: #f9fafb;
}

.navigation button.active {
  background-color: #4f46e5;
  color: white;
  border-color: #4f46e5;
}

.content {
  padding: 20px;
}
</style>