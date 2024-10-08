import { ViteSSG } from 'vite-ssg'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import App from '~/App.vue'

import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import './styles/main.pcss'
import 'virtual:windi-utilities.css'
import 'virtual:windi-devtools'
import { Module } from './types'

const routes = setupLayouts(generatedRoutes)

export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob('./modules/*.ts', {eager: true})).map((i) => (i as Module).install?.(ctx))
  },
)
