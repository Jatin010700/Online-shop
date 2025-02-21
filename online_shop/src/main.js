import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import MasonryWall from '@yeger/vue-masonry-wall'

import router from './components/router'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
    },
    theme: {
      themes: {
        light: {
          colors: {
            black: '#191919',
            white: '#ffffff',
          },
        },
      },
    },
  })

createApp(App)
.use(router)
.use(vuetify)
.use(MasonryWall)
.use(Toast, {
  toastClassName: "customToast",
  filterBeforeCreate: (toast, toasts) => {
    if (toasts.filter(
      t => t.type === toast.type
    ).length !== 0) {
      // Returning false discards the toast
      return false;
    }
    // You can modify the toast if you want
    return toast;
  }
})
.mount('#app')