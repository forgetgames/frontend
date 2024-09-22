// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
// Import Quasar css
import 'quasar/src/css/index.sass'
import { LocalStorage, Notify, Quasar } from 'quasar'
import type { InstallMethod } from '~/types'

const config = {
  plugins: { Notify, LocalStorage }, // import Quasar plugins and add here
  /*
  config: {
    brand: {
      // primary: '#e46262',
      // ... or all other brand colors
    },
    notify: {...}, // default set of options for Notify Quasar plugin
    loading: {...}, // default set of options for Loading Quasar plugin
    loadingBar: { ... }, // settings for LoadingBar Quasar plugin
    // ..and many more (check Installation card on each Quasar component/directive/plugin)
  }
  */
}

export const install: InstallMethod = ({ app }) => {
  app.use(Quasar, config)
}
