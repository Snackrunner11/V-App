import { ref, computed, onMounted, watch } from 'vue'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { Filesystem, Directory } from '@capacitor/filesystem'

export function useTodos() {
  const todos = ref([])
  const imageCache = ref({})

  const loadSavedTodos = async () => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      todos.value = JSON.parse(savedTodos)
      
      for (const todo of todos.value) {
        if (todo.imageName) {
          await loadImage(todo.imageName)
        }
      }
    }
  }

  onMounted(() => {
    loadSavedTodos()
  })

  watch(todos, (newVal) => {
    localStorage.setItem('todos', JSON.stringify(newVal))
  }, { deep: true })

  const takePhoto = async () => {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt,
        quality: 90
      })
      return photo.base64String
    } catch (error) {
      console.error("Kamera abgebrochen", error)
      return null
    }
  }

  const saveImageToFileSystem = async (base64String) => {
    const fileName = 'photo_' + Date.now() + '.jpeg'
    await Filesystem.writeFile({
      path: fileName,
      data: base64String,
      directory: Directory.Data
    })
    imageCache.value[fileName] = 'data:image/jpeg;base64,' + base64String
    return fileName
  }

  const loadImage = async (fileName) => {
    try {
      const file = await Filesystem.readFile({
        path: fileName,
        directory: Directory.Data
      })
      imageCache.value[fileName] = 'data:image/jpeg;base64,' + file.data
    } catch (error) {
      console.error("Bild konnte nicht geladen werden", error)
    }
  }

  const deleteImageFromFileSystem = async (fileName) => {
    try {
      await Filesystem.deleteFile({
        path: fileName,
        directory: Directory.Data
      })
      delete imageCache.value[fileName]
    } catch (error) {
      console.error("Bild konnte nicht gelöscht werden", error)
    }
  }

  const addTodo = async (name, dueDate, priority, category, base64Image) => {
    let imageName = null
    if (base64Image) {
      imageName = await saveImageToFileSystem(base64Image)
    }

    todos.value.push({
      id: Date.now(),
      name: name,
      dueDate: dueDate,
      priority: priority,
      category: category,
      completed: false,
      imageName: imageName
    })
  }

  const deleteTodo = async (id) => {
    const todo = todos.value.find(t => t.id === id)
    if (todo && todo.imageName) {
      await deleteImageFromFileSystem(todo.imageName)
    }
    todos.value = todos.value.filter(t => t.id !== id)
  }

  const toggleTodo = (id) => {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  const updateTodoImage = async (id, newBase64Image) => {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      if (todo.imageName) {
        await deleteImageFromFileSystem(todo.imageName)
      }
      if (newBase64Image) {
        todo.imageName = await saveImageToFileSystem(newBase64Image)
      } else {
        todo.imageName = null
      }
    }
  }

  const priorityWeights = {
    'Hoch': 3,
    'Mittel': 2,
    'Niedrig': 1
  }

  const sortedTodos = computed(() => {
    return [...todos.value].sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime()
      const dateB = new Date(b.dueDate).getTime()
      
      if (dateA !== dateB) {
        return dateA - dateB
      }
      
      const weightA = priorityWeights[a.priority] || 0
      const weightB = priorityWeights[b.priority] || 0
      
      if (weightA !== weightB) {
        return weightB - weightA
      }
      
      return a.name.localeCompare(b.name)
    })
  })

  return {
    todos,
    sortedTodos,
    imageCache,
    addTodo,
    deleteTodo,
    toggleTodo,
    takePhoto,
    updateTodoImage
  }
}