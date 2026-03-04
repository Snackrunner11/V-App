<script setup>
import { ref } from 'vue'

const props = defineProps({
  takePhoto: {
    type: Function,
    required: true
  }
})

const emit = defineEmits(['addTodo'])

const newTodoName = ref('')
const newTodoDate = ref('')
const newTodoPriority = ref('Mittel')
const newTodoCategory = ref('Privat')
const newBase64Image = ref(null)

const handleCamera = async () => {
  const base64 = await props.takePhoto()
  if (base64) {
    newBase64Image.value = base64
  }
}

const removeImage = () => {
  newBase64Image.value = null
}

const submitForm = () => {
  if (!newTodoName.value || !newTodoDate.value) return
  
  emit('addTodo', newTodoName.value, newTodoDate.value, newTodoPriority.value, newTodoCategory.value, newBase64Image.value)
  
  newTodoName.value = ''
  newTodoDate.value = ''
  newTodoPriority.value = 'Mittel'
  newTodoCategory.value = 'Privat'
  newBase64Image.value = null
}
</script>

<template>
  <form @submit.prevent="submitForm" class="add-form">
    <div class="input-group input-group-full">
      <label for="todoName">Aufgabenname</label>
      <input 
        id="todoName" 
        v-model="newTodoName" 
        type="text" 
        placeholder="Aufgabe eingeben" 
        required 
      />
    </div>
    
    <div class="input-group">
      <label for="todoDate">Fällig am</label>
      <input 
        id="todoDate" 
        v-model="newTodoDate" 
        type="date" 
        required 
      />
    </div>

    <div class="input-group">
      <label for="todoPriority">Priorität</label>
      <select id="todoPriority" v-model="newTodoPriority">
        <option value="Hoch">🔥 Hoch</option>
        <option value="Mittel">⚡ Mittel</option>
        <option value="Niedrig">☕ Niedrig</option>
      </select>
    </div>

    <div class="input-group input-group-full">
      <label for="todoCategory">Kategorie</label>
      <select id="todoCategory" v-model="newTodoCategory">
        <option value="Arbeit">💼 Arbeit</option>
        <option value="Privat">🏠 Privat</option>
        <option value="Einkauf">🛒 Einkauf</option>
      </select>
    </div>

    <div class="input-group input-group-full">
      <label>Bildanhang</label>
      <div class="image-preview-container" v-if="newBase64Image">
        <img :src="'data:image/jpeg;base64,' + newBase64Image" class="preview-image" />
        <button type="button" @click="removeImage" class="remove-image-button">Bild verwerfen</button>
      </div>
      <button type="button" v-else @click="handleCamera" class="camera-button">
        📷 Foto aufnehmen oder auswählen
      </button>
    </div>
    
    <button type="submit" class="add-button">Aufgabe Hinzufügen</button>
  </form>
</template>