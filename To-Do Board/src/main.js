import './assets/main.css'
import './assets/todos.css'

import { createApp } from 'vue'
import App from './App.vue'

import { defineCustomElements } from '@ionic/pwa-elements/loader'

createApp(App).mount('#app')

defineCustomElements(window)