import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import "./index.css"
import OptionVue from './components/Option.vue'


const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)
app.component("Option", OptionVue)
app.mount('#app')
