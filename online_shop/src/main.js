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

createApp(App).use(router).use(vuetify).use(MasonryWall).mount('#app')