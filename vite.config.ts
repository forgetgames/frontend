import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import WindiCSS from 'vite-plugin-windicss'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import {
  QuasarResolver,
} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: 'internal:charset-removal',
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === 'charset')
                atRule.remove()
            },
          },
        },
      ],
    },
  },
  resolve: {
    alias: {
      '~': `${path.resolve(__dirname, './src/')}`,
    },
  },
  plugins: [
    vue(),
    VitePWA(),
    Pages({
      extensions: ['vue'],
      extendRoute(route) {
        if (route.path === '/')
          return route

        return {
          ...route,
          meta: { auth: true },
        }
      },
    }),
    Layouts({ layoutsDir: 'src/components/templates' }),
    WindiCSS(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/head',
        '@vueuse/core',
      ],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
      resolvers: [
        IconsResolver({
          componentPrefix: '',
          enabledCollections: ['carbon'],
        }),
        QuasarResolver(),
      ],
      dts: 'src/components.d.ts',
    }),
    Icons({
      autoInstall: true,
    }),
  ],
  server: {
    fs: {
      strict: true,
    },
  },

  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
      '@vueuse/head',
    ],
    exclude: [
      'vue-demi',
    ],
  },

})
