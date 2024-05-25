// Styles
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import {mdi, aliases} from "vuetify/iconsets/mdi";

export default createVuetify({
    theme: {
        defaultTheme: 'light'
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
        iconfont: 'mdi',
    }
})
