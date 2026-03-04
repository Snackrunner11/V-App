<script setup>
const props = defineProps({
  todos: {
    type: Array,
    required: true
  },
  imageCache: {
    type: Object,
    required: true
  },
  takePhoto: {
    type: Function,
    required: true
  }
})

const emit = defineEmits(['deleteTodo', 'toggleTodo', 'updateTodoImage'])

const getPriorityClass = (priority) => {
  if (priority === 'Hoch') return 'prio-hoch'
  if (priority === 'Mittel') return 'prio-mittel'
  if (priority === 'Niedrig') return 'prio-niedrig'
  return ''
}

const handleChangeImage = async (todoId) => {
  const base64 = await props.takePhoto()
  if (base64) {
    emit('updateTodoImage', todoId, base64)
  }
}
</script>

<template>
  <div class="list-container">
    <p v-if="todos.length === 0" class="no-todos">
      Aktuell keine Aufgaben vorhanden. Zeit zum Entspannen! 😊
    </p>
    
    <ul v-else class="todo-list">
      <li v-for="todo in todos" :key="todo.id" class="todo-item" :class="{ 'is-completed': todo.completed }">
        
        <div class="todo-main-content">
          <input 
            type="checkbox" 
            :checked="todo.completed"
            @change="emit('toggleTodo', todo.id)"
            class="status-checkbox"
            title="Als erledigt markieren"
          />
          <div class="todo-details">
            <strong class="todo-name">{{ todo.name }}</strong>
            <div class="meta-info">
              <span class="date-text" title="Fälligkeitsdatum">
                <span class="due-date-icon">📅</span>{{ todo.dueDate }}
              </span>
              <span class="category-badge">{{ todo.category }}</span>
              <span class="priority-badge" :class="getPriorityClass(todo.priority)">
                {{ todo.priority }}
              </span>
            </div>
          </div>
        </div>

        <div class="todo-side-actions">
          <div class="todo-image-section" v-if="todo.imageName && imageCache[todo.imageName]">
            <img :src="imageCache[todo.imageName]" class="todo-thumbnail" />
            <div class="image-actions">
              <button @click="emit('updateTodoImage', todo.id, null)" class="icon-button" title="Bild entfernen">🗑️</button>
              <button @click="handleChangeImage(todo.id)" class="icon-button" title="Bild ändern">🔄</button>
            </div>
          </div>
          <div class="todo-image-section" v-else>
            <button @click="handleChangeImage(todo.id)" class="camera-button-small" title="Bild hinzufügen">📷 Hinzufügen</button>
          </div>

          <button @click="emit('deleteTodo', todo.id)" class="delete-button" title="Aufgabe löschen">
            Löschen
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>