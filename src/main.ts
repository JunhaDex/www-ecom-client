import './assets/styles/main.css'
import 'vue3-carousel/carousel.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const store =createPinia()
store.use(persist)
app.use(store)
app.use(router)

app.mount('#app')
