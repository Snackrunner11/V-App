<script setup>
import TodoForm from '../components/TodoForm.vue'
import TodoList from '../components/TodoList.vue'
import { useTodos } from '../composables/useTodos'

const { sortedTodos, imageCache, addTodo, deleteTodo, toggleTodo, takePhoto, updateTodoImage } = useTodos()
</script>

<template>
  <main class="todo-container">
    <h1>Aufgabenverwaltung</h1>
    
    <TodoForm @addTodo="addTodo" :takePhoto="takePhoto" />
    
    <TodoList 
      :todos="sortedTodos" 
      :imageCache="imageCache"
      :takePhoto="takePhoto"
      @deleteTodo="deleteTodo" 
      @toggleTodo="toggleTodo" 
      @updateTodoImage="updateTodoImage"
    />
  </main>
</template>